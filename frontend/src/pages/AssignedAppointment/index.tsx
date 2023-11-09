import AdminDashboardNav from "../../components/adminDashboard";
import { AssignedWorkerAppointments } from "../../components/AssignedWorkerAppointments";
import { Grid } from "@mantine/core";

const AssignedAppointmentPage = () => {
    return (
      <div>
      <Grid>
          <Grid.Col span="content">
            <AdminDashboardNav link_id={0}/>
          </Grid.Col>
          <Grid.Col span={'auto'} >
            <AssignedWorkerAppointments/>
          </Grid.Col>
        </Grid>
      </div>
    )
  }
  
  export default AssignedAppointmentPage;