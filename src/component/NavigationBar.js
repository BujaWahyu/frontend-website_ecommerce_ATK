import { useState } from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import profile from '../asset/profil-removebg-preview.png';
import keranjang from '../asset/keranjang-removebg-preview.png';
import kacaPembesar from '../asset/kacapembesar-removebg-preview.png';

const NavigationBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?nama=${searchQuery}`);
        }
    };

    return (
        <Navbar style={{ width: '100vw', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white' }}>
            <Container>
                <Navbar.Brand href="#myBg" className="tittle">
                    <span style={{ fontSize: "25px", fontFamily: "serif", color: "orange" }}>ATK</span> 
                    <span style={{ fontSize: "25px", fontFamily: "serif", color: "blue" }}>Shop</span>
                </Navbar.Brand>
                <Nav className="daftar">
                    <Navbar.Collapse>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                style={{ border: "3px solid skyblue" }}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button type="submit" variant="outline-primary">
                                <Image src={kacaPembesar} width="25" height="25" />
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                    <Nav.Link></Nav.Link>
                    <Nav.Link onClick={() => navigate("/keranjang")}>
                        <Image src={keranjang} width="60" height="40" />
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/profil")}>
                        <Image src={profile} width="60" height="40" />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
