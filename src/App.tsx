import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import VerifyEmail from './VerifyEmail';
import About from './About';
import Service from './Service';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />  {/* Added / */}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/About" element={<About />} />
       <Route path="/Service" element={<Service />} />
    </Routes>
  );
}

export default App;
