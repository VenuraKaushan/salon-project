import { Grid } from "@mantine/core";
import ManageStocks from "../../components/manageStocks";
import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import AdminDashboardNav from "../../components/adminDashboard";

const WorkerDashboaord = () => {
  return (
    <div>
      <WorkerDashboardHeader link_id={0} />
      <ManageStocks />
    </div>
  );
};

export default WorkerDashboaord;
