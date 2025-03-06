import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Button, Image } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock user data - in a real app, this would come from your auth context/state
  const user = {
    name: 'John Doe',
    avatar: '/api/placeholder/40/40', // Placeholder image
    role: 'Admin'
  };
  
  const handleLogout = () => {
    // In a real app, this would clear auth tokens/state
    // For now, just navigate to login page
    navigate('/login');
  };
  
  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      fixed="top" 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="shadow-sm"
    >
      <Container fluid>
        {/* Logo/Brand */}
        <Navbar.Brand as={Link} to="/dashboard">
          <i className="bi bi-bar-chart-fill me-2"></i>
          Sales Analytics
        </Navbar.Brand>
        
        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          {/* Main Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === '/dashboard'} 
              onClick={() => setExpanded(false)}
            >
              Dashboard
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/products" 
              active={location.pathname === '/products'} 
              onClick={() => setExpanded(false)}
            >
              Products
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/CreateProductPage" 
              active={location.pathname === '/CreateProductPage'} 
              onClick={() => setExpanded(false)}
            >
              Add Product
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/orders" 
              active={location.pathname === '/orders'} 
              onClick={() => setExpanded(false)}
            >
              Orders
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/customers" 
              active={location.pathname === '/customers'} 
              onClick={() => setExpanded(false)}
            >
              Customers
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/reports" 
              active={location.pathname === '/reports'} 
              onClick={() => setExpanded(false)}
            >
              Reports
            </Nav.Link>
          </Nav>
          
          {/* User Profile and Logout */}
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="transparent" id="user-dropdown" className="text-white border-0 d-flex align-items-center">
                <Image 
                  src={user.avatar} 
                  roundedCircle 
                  width="32" 
                  height="32" 
                  className="me-2" 
                />
                {user.name}
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="shadow-sm mt-2">
                <Dropdown.Header>Signed in as {user.role}</Dropdown.Header>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Layout component that includes the Navbar and content area
export const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
        {children}
      </div>
    </>
  );
};

export default NavigationBar;