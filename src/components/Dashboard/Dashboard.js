import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardTable from "./DashboardTable";
import { Container } from "semantic-ui-react";

/**
 * @function UserFormModal - Top level functional component for the user management table
 * @param {Object} props - inherited object of information needed for component to function
 */
const Dashboard = () => {
  return (
    <Container style={{ marginTop: "50px" }} data-testid="dashboard">
      <DashboardHeader />
      <DashboardTable />
    </Container>
  );
};

export default Dashboard;
