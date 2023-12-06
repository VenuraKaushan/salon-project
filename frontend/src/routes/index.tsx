
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClientLogingPage from "../pages/Login/clientLogin";
import ClientDashboar from "../pages/clientDashboard";
import ManageAppointment from "../components/appointmentMange";

//admin
import AdminLoginPage from "../pages/Login/adminLogin";
import AdminDashboard from "../pages/adminDashboard";
import CatalogPage from "../pages/CatalogPage";
import ClientPage from "../pages/registeredClients";
import AppointmentPage from "../pages/NewAppointment";
import AssignedAppointmentPage from "../pages/AssignedAppointment";
import CompletedAppintmentPage from "../pages/CompletedAppoinment";
import WorkerDashboaord from "../pages/WorkerDashboard/Invoice";
import GenerateInvoicePage from "../pages/GenerateInvoice";
import StockPage from "../pages/StockPage";
import ProfitPage from "../pages/ProfitPage";
import ProfitCard from "../components/ProfitCard";

const AllRoutes = () => {
  const client = new QueryClient();//config query client
  return (
    <div>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/client/login" element={<ClientLogingPage />} />
            <Route path="/client/dashboard" element={<ClientDashboar />} />

           
            <Route path="/add/appintment" element={<ManageAppointment />} /> {/* for testing purposes */}


            {/* admin route */}
            <Route path="/login/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/catalog" element={<CatalogPage />} />
            <Route path="/admin/clients" element={<ClientPage />} />
            <Route path="/admin/appointments" element={<AppointmentPage />} />
            <Route path="/admin/assigned" element = {<AssignedAppointmentPage/>}/>
            <Route path="/admin/completed" element={<CompletedAppintmentPage/>} />

            <Route path="/worker/managestock" element={<WorkerDashboaord />} />
            <Route path="/worker/invoice" element={<GenerateInvoicePage />} />
            <Route path="/admin/workerdashboardHeader" element={<WorkerDashboaord />} />
            <Route path="/admin/profitpage" element={<ProfitPage />} />
            <Route path="/admin/profitcard" element={<ProfitCard/>} />
            <Route path="/admin/stokepage" element={<StockPage/>} />

          </Routes>
        </Router>
      </QueryClientProvider>
      
    </div>
  );
};

export default AllRoutes;
