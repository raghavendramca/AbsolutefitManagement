import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SubscriptionDetailPage from './pages/SubscriptionDetailPage';
import GymDetailPage from './pages/GymDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionsPage />} />
        <Route path="/subscriptions/:subscriptionId" element={<SubscriptionDetailPage />} />
        <Route path="/subscriptions/:subscriptionId/gyms/:gymId" element={<GymDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
