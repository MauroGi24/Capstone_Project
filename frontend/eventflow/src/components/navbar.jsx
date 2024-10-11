  import { Container, Nav, Navbar } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import ModalLogin from "./Login/ModalLogin";
  import {LoginContext} from "../context/LoginContext"; 
  import { useContext, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import '../page/assets/CSS/style.css'
  

  function EventFlowNavbar() {

    const { userInfo, setUserInfo, token, setToken} = useContext(LoginContext)
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
    
    const handleToggle = () =>{
      setExpanded(!expanded)
    }

    const closeMenu = () => {
      setExpanded(false)
    }
    
    const logout = () => {
      localStorage.removeItem('token');  
      setToken(null);  
      setUserInfo(null); 
  
      navigate('/');
    };
  
    return (
      <Navbar collapseOnSelect expand="lg" expanded={expanded} onToggle={handleToggle} className="sticky-top">
      <Container>
        <Navbar.Brand onClick={closeMenu} as={Link} to='/'>EventFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {userInfo?.role === 'visitor' && (
              <Nav.Link onClick={closeMenu} as={Link} to='/profile'>Il tuo profilo</Nav.Link>
            )}
            {userInfo?.role === 'admin' && <Nav.Link as={Link} to='/admin'>Dashboard</Nav.Link>}
          </Nav>
          <Nav>
            <ModalLogin />
            {token && (
              <div className="logout-container" onClick={logout}>
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 579.193 579.193"
                  style={{ enableBackground: "new 0 0 579.193 579.193", width: "24px", height: "24px" }}
                  xmlSpace="preserve"
                  className="logout-icon"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M261.808,578.693h259.757c21.061,0,38.193-17.134,38.193-38.194V38.694c0-21.061-17.133-38.194-38.193-38.194H261.001 
                          c-11.83,0-21.42,9.59-21.42,21.42s9.59,21.42,21.42,21.42h255.918v492.514H261.808c-11.83,0-21.42,9.59-21.42,21.42 
                          S249.978,578.693,261.808,578.693z"/>
                        <path d="M521.565,579.193H261.808c-12.087,0-21.92-9.833-21.92-21.92s9.833-21.92,21.92-21.92h254.611V43.84H261.001 
                          c-12.087,0-21.92-9.833-21.92-21.92S248.914,0,261.001,0h260.564c21.336,0,38.693,17.358,38.693,38.694v501.805 
                          C560.259,561.835,542.901,579.193,521.565,579.193z"/>
                      </g>
                      <g>
                        <path d="M275.602,128.723c-3.012-6.798-7.296-12.833-12.734-17.935c-10.402-9.759-23.977-15.134-38.224-15.134 
                          c0,0-0.002,0-0.003,0c-13.836,0-27.123,5.171-37.413,14.558L37.577,246.719c-11.53,10.518-18.143,25.5-18.142,41.106 
                          c0,15.605,6.613,30.587,18.142,41.104l149.651,136.508c10.291,9.388,23.579,14.558,37.415,14.558 
                          c14.247,0,27.822-5.374,38.223-15.133c5.438-5.102,9.723-11.136,12.735-17.935c3.157-7.125,4.759-14.727,4.759-22.596v-19.746 
                          h139.543c30.678,0,55.637-24.959,55.637-55.638V226.701c0-30.678-24.959-55.638-55.637-55.638H280.36v-19.747 
                          C280.36,143.449,278.759,135.847,275.602,128.723z"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="logout-text">Logout</span>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EventFlowNavbar;
