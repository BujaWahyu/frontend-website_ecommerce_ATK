import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup, Image } from 'react-bootstrap';
import tempatSampah from '../asset/tempat-sampah-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Admin from '../component/Admin'
import axios from 'axios';

const ITEMS_PER_PAGE = 2; // Menampilkan hanya 2 produk per halaman

const ListProduk = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Mengambil data dari localhost:3000/produk ketika komponen dimuat
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/produk');
            setProducts(response.data); // Memperbarui state products dengan data yang diambil
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Mereset ke halaman pertama pada pencarian baru
    };

    const filteredProducts = products.filter(product =>
        product.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Menghitung startIndex dan endIndex berdasarkan currentPage dan ITEMS_PER_PAGE
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const selectedProducts = filteredProducts.slice(startIndex, endIndex);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/produk/${productId}`);
            fetchProducts(); // Mengambil ulang produk setelah penghapusan
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Container className='pt-4'>
            <Admin/>
            <Row className='p-2'>
                <Col>
                    <h3>Daftar Produk</h3>
                    <Button onClick={() => navigate("/create-produk")} variant="success" className='mb-2'>
                        + Tambah Produk
                    </Button>
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder="Cari..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Deskripsi</th>
                                <th>Harga</th>
                                <th>Gambar</th>
                                <th>Stok</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{product.nama}</td>
                                    <td>{product.deskripsi}</td>
                                    <td>{product.harga}</td>
                                    <td className='d-flex justify-content-center align-items-center'><Image src={require(`../asset/${product.gambar}`)} width="50" height="50" /></td>
                                    <td>{product.stok}</td>
                                    <td>
                                        <Button onClick={() => navigate(`/update-produk/${product.id}`)} variant='primary' style={{ marginRight: "3px", marginBottom: "10px" }}>Edit</Button>
                                        <Button onClick={() => handleDeleteProduct(product.id)} variant='danger'> <Image src={tempatSampah} width="26" height="20" /> </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
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
                        disabled={endIndex >= filteredProducts.length}
                    >
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ListProduk;
