
import { Grid } from "@mantine/core";
import SecreteAdminDashboardNav from '../../components/secreteAdminDashboard';
import { SecreteAdminInvoices } from "../../components/secreteAdminInvoices";

const SecreteAdminInvoice = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <SecreteAdminDashboardNav link_id={0} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
          <SecreteAdminInvoices />
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default SecreteAdminInvoice;