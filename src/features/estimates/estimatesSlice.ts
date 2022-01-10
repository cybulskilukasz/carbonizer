import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { CONFIG } from "../../app/config";

export interface Estimates {
  estimates: Estimate[];
  status: string;
  error: string | null | undefined;
}

export interface Estimate {
  data: {
    id: string;
    type: string | "estimate";
    attributes: EstimateAttributes;
  };
}

export interface EstimateAttributes {
  country: string;
  state: string | null;
  electricity_unit: string;
  electricity_value: number;
  estimated_at: string;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;
}

interface EstimatesRequestPayload {
  type: string;
  country: string;
  electricity_unit: string;
  electricity_value: number;
}

const initialState: Estimates = {
  estimates: [],
  status: "idle",
  error: null,
};

export const fetchEstimates = createAsyncThunk(
  "estimates/fetchEstimates",
  async () => {
    const response = await client.get(`${CONFIG.API_BASE_URL}/estimates`);
    return response.data;
  }
);

export const createNewEstimate = createAsyncThunk(
  "estimates/createNewEstimates",
  async (estimate: EstimatesRequestPayload) => {
    const response = await client.post(
      `${CONFIG.API_BASE_URL}/estimates`,
      estimate
    );
    return response.data;
  }
);

const estimateSlice = createSlice({
  name: "estimates",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEstimates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.estimates = action.payload;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewEstimate.fulfilled, (state, action) => {
        state.estimates.push(action.payload);
      });
  },
});

export default estimateSlice.reducer;

export const selectAllEstimatesChartData = (state: RootState) =>
  state.estimates.estimates.map((estimate) => {
    return {
      date: estimate.data.attributes.estimated_at,
      value: estimate.data.attributes.carbon_kg,
    };
  });

export const selectEstimatesByCountryChartData = (
  state: RootState,
  country: string
) =>
  state.estimates.estimates
    .filter((estimate) => estimate.data.attributes.country === country)
    .map((estimate) => {
      return {
        date: estimate.data.attributes.estimated_at,
        value: estimate.data.attributes.carbon_kg,
      };
    });
