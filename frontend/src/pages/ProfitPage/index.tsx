import StatsProfitCard from "../../components/ProfitCard";
import AdminDashboardHeader from "../../components/adminDashboardHeader";
import { Grid } from "@mantine/core";
import Chart from "../../components/profitChart/chart";
import WorkerDashboardHeader from "../../components/workerDashboardHeader";

const ProfitPage = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <WorkerDashboardHeader link_id={1} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
            <StatsProfitCard />
            {/* <Chart/> */}
        </Grid.Col>


        
      </Grid>

      
    </div>
  );
};

export default ProfitPage;
