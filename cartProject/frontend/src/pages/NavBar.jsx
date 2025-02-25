import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function CustomNavbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary px-3">
        <Container fluid>
          <Navbar.Brand href="#">Cart Work</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Category 1</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Category 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">More...</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Buttons with Icons */}
            <Button variant="primary" className="mx-2">
              <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Sign up
            </Button>

            <Button variant="dark" className="mx-2">
              <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
            </Button>

            <Button variant="dark" className="mx-2">
              <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Cart
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Bar below the navbar */}
      <div className="container mt-3">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
    </>
  );
}

export default CustomNavbar;
