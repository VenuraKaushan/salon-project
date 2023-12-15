import { Center, Grid } from "@mantine/core";
import ManageStocks from "../../components/manageStocks";
import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import AdminDashboardNav from "../../components/adminDashboard";

const WorkerDashboaord = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <AdminDashboardNav link_id={5} />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <ManageStocks />
        </Grid.Col>
      </Grid>   
    </div>
  );
};

export default WorkerDashboaord;
