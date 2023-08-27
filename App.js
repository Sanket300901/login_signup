
import './App.css';
import Login from './components/login/login';
import Register from "./components/register/register"
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import DashBoard from './components/dashboard/dashboard';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
      <Route path="/login" element={<Login />} />
    
      <Route path="/register"  element={<Register />}/>
      <Route path="/dashboard"  element={<DashBoard />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

