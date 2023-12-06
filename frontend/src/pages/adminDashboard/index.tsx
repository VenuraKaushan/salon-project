
import StatsProfitCard from '../../components/ProfitCard'
import AdminDashboardNav from '../../components/adminDashboard'

const AdminDashboard = () => {
  return (
    <div>
        <AdminDashboardNav link_id={1}/>
        <StatsProfitCard/>
    </div>
  )
}

export default AdminDashboard