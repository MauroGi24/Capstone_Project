import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EventFlowNavbar from './components/navbar';
import LoginContextProvider from './context/LoginContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';


function App() {
  return (
    <>
    <LoginContextProvider>
    <Router>
    <EventFlowNavbar />
      <Routes>
        <Route path="/" element={<NotFound />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/profile" element={<UserProfile />}/>
      </Routes>
    </Router>
    </LoginContextProvider>
    </>
  );
}

export default App;
