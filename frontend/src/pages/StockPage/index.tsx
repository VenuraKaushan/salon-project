import StockTable from "../../components/stock";
import AdminDashboardHeader from "../../components/adminDashboardHeader";
import { Center, Grid, Header } from "@mantine/core";
import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import AdminDashboardNav from "../../components/adminDashboard";

const StockPage = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <AdminDashboardNav link_id={6} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
          <StockTable />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default StockPage;
