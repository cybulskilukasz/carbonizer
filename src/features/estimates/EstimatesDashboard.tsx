import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EstimatesChart from "./EstimatesChart";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchEstimates,
  selectAllEstimatesChartData,
  selectEstimatesByCountryChartData,
} from "./estimatesSlice";
import { RootState } from "../../app/store";

const EstimatesDashboard: React.FC = () => {
  const [country, setCountry] = useState("");
  const dispatch = useAppDispatch();

  const estimatesChartData = useAppSelector(selectAllEstimatesChartData);
  const estimatesByCountryChartData = useAppSelector((state: RootState) =>
    selectEstimatesByCountryChartData(state, country)
  );
  const estimatesStatus = useAppSelector(
    (state: RootState) => state.estimates.status
  );
  const error = useAppSelector((state: RootState) => state.estimates.error);

  const onCountryCodeChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCountry(event.target.value);
  };

  const chartData = () => {
    if (country.length > 1) {
      return estimatesByCountryChartData;
    } else {
      return estimatesChartData;
    }
  };

  useEffect(() => {
    if (estimatesStatus === "idle") {
      dispatch(fetchEstimates());
    }
  }, [estimatesStatus, dispatch]);

  return (
    <Paper sx={{ padding: "16px" }}>
      <Box sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
        <Typography variant="h5" color={"primary"} gutterBottom component="div">
          Carbon impact over time
        </Typography>
      </Box>
      {estimatesStatus === "loading" && (
        <Box
          sx={{ paddingTop: "32px" }}
          display={"flex"}
          justifyContent={"center"}
          height={300}
        >
          <CircularProgress size={64} color={"secondary"} />
        </Box>
      )}

      {estimatesStatus === "failed" && (
        <Box
          sx={{ paddingTop: "32px" }}
          display={"flex"}
          justifyContent={"center"}
          height={300}
        >
          <Typography variant={"h6"} color={"error"}>
            {error}
          </Typography>
        </Box>
      )}

      {estimatesStatus === "succeeded" && (
        <Box>
          <TextField
            id="outlined-required"
            label="Filter by country code"
            placeholder={'e.g. "de"'}
            fullWidth={true}
            value={country}
            onChange={onCountryCodeChanged}
          />
          <Box sx={{ paddingTop: "32px" }}>
            <EstimatesChart
              data={chartData()}
              options={{ fillColor: "#1ef9df", strokeColor: "#1ef9df" }}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default EstimatesDashboard;
