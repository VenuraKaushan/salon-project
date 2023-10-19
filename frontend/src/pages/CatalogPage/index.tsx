import { Grid } from "@mantine/core";
import AdminDashboardNav from '../../components/adminDashboard'
import Catalog from "../../components/Catalog";


const CatalogPage = () => {
  return (
    <div>
    <Grid>
        <Grid.Col span="content">
          <AdminDashboardNav link_id={3}/>
        </Grid.Col>
        <Grid.Col span="content">
          <Catalog/>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default CatalogPage;