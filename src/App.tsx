import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import About from './About';
import Service from './Service';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Home" element={<Home />} />
      
      {/* Public routes - no login required */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      
      {/* Protected routes - login required */}
      <Route path="/contact" element={
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      } />
      
      <Route path="/About" element={
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      } />
      
      <Route path="/Service" element={
        <ProtectedRoute>
          <Service />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
