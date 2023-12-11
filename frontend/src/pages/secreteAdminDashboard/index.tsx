
import { Grid } from "@mantine/core";
import SecreteAdminDashboardNav from '../../components/secreteAdminDashboard';


const SecreteAdminDashboard = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <SecreteAdminDashboardNav link_id={0} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
          {/* <center>
            <h1>PROFIT OF THE DAY</h1>
          </center>
          <StatsProfitCard /> */}
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default SecreteAdminDashboard;