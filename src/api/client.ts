// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import {CONFIG} from "../app/config";

interface EstimatesPayloadRequest {
  type: string;
  country: string;
  electricity_unit: string;
  electricity_value: number;
}

interface EstimatesRequestConfig {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

interface EstimatesRequestHeaders {
  "Content-Type": string;
  Authorization: string;
}

export const client = async (
  endpoint: string,
  payload?: EstimatesPayloadRequest
) => {
  const headers: EstimatesRequestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CONFIG.API_KEY}`,
  };

  const config: EstimatesRequestConfig = {
    method: payload ? "POST" : "GET",
    headers: {
      ...headers,
    },
  };

  if (payload) {
    config.body = JSON.stringify(payload);
  }

  let data;
  try {
    const response = await fetch(endpoint, config);
    data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return {
      status: response.status,
      data,
      headers: response.headers,
      url: response.url,
    };
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
};

client.get = (endpoint: string) => client(endpoint);
client.post = (endpoint: string, payload: EstimatesPayloadRequest) =>
  client(endpoint, payload);
