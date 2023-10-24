
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

          </Routes>
        </Router>
      </QueryClientProvider>

    </div>
  );
};

export default AllRoutes;
