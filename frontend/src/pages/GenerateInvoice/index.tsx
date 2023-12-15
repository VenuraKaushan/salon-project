import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import Invoices from "../../components/Invoices/invoices";
<<<<<<< Updated upstream
import { Grid } from "@mantine/core";
import AdminDashboardNav from "../../components/adminDashboard";
=======
import AdminDashboardNav from "../../components/adminDashboard";
import { Grid } from "@mantine/core";
>>>>>>> Stashed changes

const GenerateInvoicePage = () => {
  return (
    <div>
      <Grid>
<<<<<<< Updated upstream
        <Grid.Col span={"content"}>
          <AdminDashboardNav link_id={7} />
        </Grid.Col>

=======
        <Grid.Col span="content">
          <AdminDashboardNav link_id={7} />
        </Grid.Col>
>>>>>>> Stashed changes
        <Grid.Col span={"auto"}>
          <Invoices />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default GenerateInvoicePage;
