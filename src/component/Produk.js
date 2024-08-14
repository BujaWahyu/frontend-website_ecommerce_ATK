import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Gambar ball poin
// import Ballpoint1 from '../asset/Ballpoint1.jpeg'

const ITEMS_PER_PAGE = 4; // Number of cards per page

const Produk = () => {
    const navigate = useNavigate();
    const { kategoriId } = useParams(); // Mengambil ID kategori dari URL

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/produk');
                const allProducts = response.data;
                // Filter products based on kategoriId
                const filteredProducts = allProducts.filter(product => product.kategori.id === parseInt(kategoriId));
                console.log(allProducts);
                setProducts(filteredProducts);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [kategoriId]); // Menjalankan efek samping saat kategoriId berubah

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const selectedProducts = products.slice(startIndex, endIndex);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container>
            <NavigationBar />
            <div className="produk">
                <Row lg={4} className="g-4">
                    {selectedProducts.map((product) => (
                        <Col key={product.id}>
                            <Card>
                                <Card.Img variant="top" src={require(`../asset/${product.gambar}`)} /> {/* Use your image */}
                                {/* <Image src={require(`../asset/${product.gambar}`)}></Image> */}
                                <Card.Body>
                                    <Card.Title>{product.nama}</Card.Title>
                                    <Card.Text>Rp. {product.harga}</Card.Text> {/* Assuming price is a property */}
                                    <Button onClick={() => navigate(`/detail-produk/${product.id}`)} variant="primary">Detail Produk</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className="mt-3">
                    <Col className="d-flex justify-content-between">
                        <Button
                            variant="secondary"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleNextPage}
                            disabled={endIndex >= products.length}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Produk;
