import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Admin = () => {
// const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Admin</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Produk</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Admin;