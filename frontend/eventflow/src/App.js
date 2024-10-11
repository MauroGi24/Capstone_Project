import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EventFlowNavbar from './components/Navbar'
import Admin from './page/Admin';
import UserProfile from './page/UserProfile';
import Home from './page/Home';
import NotFound from './page/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <>    
    <Router>
    <EventFlowNavbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<UserProfile />}/>
        <Route path="/admin" element={
          <ProtectedRoute element={<Admin />} role={['admin']} />
        }/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
