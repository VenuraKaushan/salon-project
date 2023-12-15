import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import Invoices from "../../components/Invoices/invoices";
import { Grid } from "@mantine/core";
import AdminDashboardNav from "../../components/adminDashboard";

const GenerateInvoicePage = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <AdminDashboardNav link_id={7} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
          <Invoices />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default GenerateInvoicePage;
