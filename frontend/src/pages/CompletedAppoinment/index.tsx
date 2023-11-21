import AdminDashboardNav from "../../components/adminDashboard";
import { CompleteAppointment } from "../../components/completedAppointment";
import { Grid } from "@mantine/core";

const CompletedAppintmentPage = () => {
    return (
      <div>
      <Grid>
          <Grid.Col span="content">
            <AdminDashboardNav link_id={3}/>
          </Grid.Col>
          <Grid.Col span={'auto'} >
            <CompleteAppointment/>
          </Grid.Col>
        </Grid>
      </div>
    )
  }
  
  export default CompletedAppintmentPage;