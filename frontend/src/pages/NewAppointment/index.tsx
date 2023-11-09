import AdminDashboardNav from "../../components/adminDashboard";
import { Appointments } from "../../components/NewAppointmentAdminPanel";
import { Grid } from "@mantine/core";

const AppointmentPage = () => {
    return (
      <div>
      <Grid>
          <Grid.Col span="content">
            <AdminDashboardNav link_id={0}/>
          </Grid.Col>
          <Grid.Col span={'auto'} >
            <Appointments/>
          </Grid.Col>
        </Grid>
      </div>
    )
  }
  
  export default AppointmentPage;