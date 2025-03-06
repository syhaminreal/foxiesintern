import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NavigationBar from './components/NavigationBar.jsx';
import AuthApp from './pages/Auth.jsx';
import SignUpPage from "./pages/Signup.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="flex-1">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Auth" element={<AuthApp />} />  
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;