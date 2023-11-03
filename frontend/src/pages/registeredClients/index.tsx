import AdminDashboardNav from "../../components/adminDashboard";
import { RegisteredClients } from "../../components/registeredClients";
import { Grid } from "@mantine/core";

const ClientPage = () => {
    return (
      <div>
      <Grid>
          <Grid.Col span="content">
            <AdminDashboardNav link_id={1}/>
          </Grid.Col>
          <Grid.Col span={'auto'} >
            <RegisteredClients/>
          </Grid.Col>
        </Grid>
      </div>
    )
  }
  
  export default ClientPage;