import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulated User Data
  const user = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/40", // Placeholder Image
    role: "Admin",
  };

  // Logout Function
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
      className="shadow-sm"
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <i className="bi bi-bar-chart-fill me-2"></i> Sales Analytics
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        {/* Navbar Content */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === "/"}
              onClick={() => setExpanded(false)}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              active={location.pathname === "/products"}
              onClick={() => setExpanded(false)}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/create-product"
              active={location.pathname === "/create-product"}
              onClick={() => setExpanded(false)}
            >
              Add Product
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reports"
              active={location.pathname === "/reports"}
              onClick={() => setExpanded(false)}
            >
              Reports
            </Nav.Link>
          </Nav>

          {/* User Dropdown */}
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="transparent"
                id="user-dropdown"
                className="text-white border-0 d-flex align-items-center"
              >
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
                  <i className="bi bi-person me-2"></i> My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  <i className="bi bi-gear me-2"></i> Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
