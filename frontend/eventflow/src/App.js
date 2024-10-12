import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EventFlowNavbar from './components/Navbar'
import Footer from './components/Footer';
import Admin from './page/Admin';
import UserProfile from './page/UserProfile';
import Home from './page/Home';
import Event from './page/Event.jsx'
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
        <Route path="/event/:id" element={<Event />}/>
        <Route path="*" element={<NotFound />}/>        
      </Routes>
        <Footer />
    </Router>
    </>
  );
}

export default App;
