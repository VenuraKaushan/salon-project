
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
          <center>
            <h1>PROFIT OF THE DAY</h1>
          </center>
          <StatsProfitCard />
          {/* <Chart/> */}
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default AdminDashboard