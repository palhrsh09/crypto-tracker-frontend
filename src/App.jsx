import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CryptoDashboard from './components/CryptoDashboard';
import HistoryChart from './components/HistoryChart'; 
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <CryptoDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/chart/:coinId"
            element={
              <PrivateRoute>
                <HistoryChart />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
