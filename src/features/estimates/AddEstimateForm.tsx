import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createNewEstimate } from "./estimatesSlice";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const AddEstimateForm: React.FC = () => {
  const [countryCode, setCountryCode] = useState("");
  const [unit, setUnit] = useState("");
  const [value, setValue] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();

  const onCountryCodeChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setCountryCode(e.target.value);
  const onUnitChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUnit(e.target.value);
  const onValueChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValue(e.target.value);

  const canSave = [countryCode, unit, value].every(Boolean);

  const onSubmitUsageClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          createNewEstimate({
            type: "electricity",
            country: countryCode,
            electricity_unit: unit,
            electricity_value: parseFloat(value),
          })
        ).unwrap();
        setAddRequestStatus("succeeded");
        setCountryCode("");
        setUnit("");
        setValue("");
      } catch (err) {
        setAddRequestStatus("failed");
      }
    }
  };

  return (
    <Paper sx={{ padding: "16px" }}>
      <Box sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
        <Typography variant="h5" color={"primary"} gutterBottom component="div">
          Enter electricity usage
        </Typography>
      </Box>
      <Box>
        {addRequestStatus === "failed" && (
          <Alert severity="error">Could not create estimate</Alert>
        )}

        {addRequestStatus === "succeeded" && (
          <Alert severity="success">
            Your estimate has been created! See your dashboard.
          </Alert>
        )}

        <TextField
          required
          label="Enter country code"
          placeholder={'e.g. "de"'}
          fullWidth={true}
          margin={"normal"}
          value={countryCode}
          onChange={onCountryCodeChanged}
        />
        <TextField
          required
          label="Enter unit"
          placeholder={'e.g. "kwh"'}
          fullWidth={true}
          margin={"normal"}
          value={unit}
          onChange={onUnitChanged}
        />
        <TextField
          required
          label="Enter value"
          type={"number"}
          placeholder={'e.g. "41.3"'}
          fullWidth={true}
          margin={"normal"}
          value={value}
          onChange={onValueChanged}
        />
        <Button
          variant={"contained"}
          color={"secondary"}
          size={"large"}
          fullWidth
          disabled={!canSave}
          sx={{ marginTop: "16px", marginBottom: "16px" }}
          onClick={onSubmitUsageClicked}
        >
          Submit usage
        </Button>
      </Box>
    </Paper>
  );
};

export default AddEstimateForm;
