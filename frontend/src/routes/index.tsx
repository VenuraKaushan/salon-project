
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import ClientLogingPage from "../pages/Login/clientLogin";
import ClientDashboar from "../pages/clientDashboard";

//admin
import AdminLoginPage from "../pages/Login/adminLogin";

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

        {/* admin route */}
        <Route path="/login/admin" element={<AdminLoginPage />} />

      </Routes>
    </Router>
    </QueryClientProvider>
    </div>
  );
};

export default AllRoutes;
