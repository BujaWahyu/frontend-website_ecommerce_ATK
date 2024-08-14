import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import NavigationBar from './NavigationBar';
import Sepatu from '../asset/sepatu.jpg';

const DetailProduk = () => {
    const { id } = useParams(); // Ambil ID produk dari URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/produk/${id}`);
                console.log(response.data);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            const response = await axios.post('http://localhost:3000/keranjang', {
                produk: parseInt(id),
            });
            console.log(response.data);
            alert('Produk berhasil ditambahkan ke keranjang');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('Gagal menambahkan produk ke keranjang');
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <Container style={{ height: "100vh", width: "100vw", backgroundColor: "skyblue" }} className="border d-flex justify-content-center align-items-center">
            <div style={{ width: "90%", height: "80%", backgroundColor: "white" }} className="border">
                <Row lg={2} className="border" style={{ height: "100%", backgroundColor: "white" }}>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Image src={require(`../asset/${product.gambar}`)} width="400" height="400" /> {/* Gunakan gambar dari produk atau default */}
                    </Col>
                    <Col>
                        <Row lg={1} className="p-4">
                            <Col style={{ borderBottom: "2px solid red" }}><h4>{product.nama}</h4></Col>
                            <Col className="pt-3">
                                <Row lg={2}>
                                    <Col><span style={{ fontSize: "18px", fontWeight: "600" }}>Harga </span></Col>
                                    <Col><span> Rp. {product.harga}</span></Col>
                                </Row>
                            </Col>
                            <Col className="pt-1">
                                <Row lg={2}>
                                    <Col><span style={{ fontSize: "18px", fontWeight: "600" }}>Kategori </span></Col>
                                    <Col><span>{product.kategori.nama}</span></Col>
                                </Row>
                            </Col>
                            <Col className="pt-1">
                                <Row lg={2}>
                                    <Col><span style={{ fontSize: "18px", fontWeight: "600" }}>Stok </span></Col>
                                    <Col><span>{product.stok} buah</span></Col>
                                </Row>
                            </Col>
                            <Col className="pt-1">
                                <span style={{ fontSize: "18px", fontWeight: "600" }}>Deskripsi:</span>
                            </Col>
                            <Col className="pt-1">{product.deskripsi}</Col>
                            <Col className="pt-4">
                                <Row lg={2}>
                                    <Col></Col>
                                    <Col>
                                        <Button style={{ marginRight: "10px" }} onClick={addToCart}>Keranjang</Button>
                                        <Button variant="success" onClick={() => navigate(`/produk/${product.id}`)}>Kembali</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default DetailProduk;
