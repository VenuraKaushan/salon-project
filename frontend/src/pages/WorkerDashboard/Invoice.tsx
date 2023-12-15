import { Center, Grid } from "@mantine/core";
import ManageStocks from "../../components/manageStocks";
import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import AdminDashboardNav from "../../components/adminDashboard";

const WorkerDashboaord = () => {
  return (
    <div>
      <Grid>
<<<<<<< Updated upstream
        <Grid.Col span={"content"}>
=======
        <Grid.Col span="content">
>>>>>>> Stashed changes
          <AdminDashboardNav link_id={5} />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <ManageStocks />
        </Grid.Col>
<<<<<<< Updated upstream
      </Grid>   
=======
      </Grid>
>>>>>>> Stashed changes
    </div>
  );
};

export default WorkerDashboaord;
