import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './components/auth/Login';
import SignUpPage from './components/auth/SignUp';
import Dashboard from './pages/Dashboard';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>    
  )
}

export default App
