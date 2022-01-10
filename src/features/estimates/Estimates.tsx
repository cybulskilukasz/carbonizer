import React, { useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import AddEstimateForm from "./AddEstimateForm";
import EstimatesDashboard from "./EstimatesDashboard";

export const Estimates: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChanged = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          height: 64,
          backgroundColor: "#FFF",
        }}
      >
        <Container maxWidth={"md"}>
          <Tabs
            variant="fullWidth"
            centered={true}
            value={tabIndex}
            onChange={onTabChanged}
            aria-label="basic tabs example"
            sx={{ height: 64 }}
          >
            <Tab sx={{ height: 64 }} label="Dashboard" />
            <Tab sx={{ height: 64 }} label="Data entry" />
          </Tabs>
        </Container>
      </Box>
      <Box height={"100%"}>
        <Container maxWidth={"md"}>
          <TabPanel value={tabIndex} index={0}>
            <EstimatesDashboard />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <AddEstimateForm />
          </TabPanel>
        </Container>
      </Box>
    </div>
  );
};
