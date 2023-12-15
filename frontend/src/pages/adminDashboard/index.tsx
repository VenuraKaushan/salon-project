
import StatsProfitCard from '../../components/ProfitCard'
import AdminDashboardNav from '../../components/adminDashboard'
import { Grid } from "@mantine/core";


const AdminDashboard = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <AdminDashboardNav link_id={0} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
<<<<<<< Updated upstream
          <center>
            <h1>REVENUE OF THE DAY</h1>
          </center>
=======
>>>>>>> Stashed changes
          <StatsProfitCard />
          {/* <Chart/> */}
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default AdminDashboard