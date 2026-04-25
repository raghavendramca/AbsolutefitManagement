import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SubscriptionDetailPage from './pages/SubscriptionDetailPage';
import GymDetailPage from './pages/GymDetailPage';
import LoginPage from './pages/LoginPage';
import SelectBranchPage from './pages/SelectBranchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:tenantType" element={<LoginPage />} />
        <Route path="/select-branch" element={<SelectBranchPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/subscriptions/new" element={<SubscriptionsPage />} />
        <Route path="/subscriptions/:subscriptionId" element={<SubscriptionDetailPage />} />
        <Route path="/subscriptions/:subscriptionId/gyms/:gymId" element={<GymDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
