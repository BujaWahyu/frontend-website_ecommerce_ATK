import React, { useState, useEffect } from 'react';
import { Col, Container, Form, InputGroup, Row, Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduk = () => {
    const { id } = useParams(); // Mendapatkan nilai dari parameter id
    const [produk, setProduk] = useState({
        nama: '',
        deskripsi: '',
        harga: '',
        kategori: '',
        stok: '',
        gambar: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduk();
    }, []);

    const fetchProduk = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/produk/${id}`);
            setProduk(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduk({
            ...produk,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:3000/produk/${id}`, produk);
            alert('Produk berhasil diupdate:', response.data);
            // Tambahkan logika untuk memberikan feedback kepada pengguna jika berhasil
        } catch (error) {
            alert('Gagal mengupdate produk:', error);
            // Tambahkan logika untuk menangani error dari backend atau koneksi
        }
    };

    return (
        <div style={{ height: "90vh", width: "100vw" }}>
            <Container className="pt-4">
                <div style={{ backgroundColor: "green", padding: "10px" }}>
                    <span style={{ fontSize: "19px", fontWeight: "500", fontFamily: "sans-serif", color: "whitesmoke" }}>
                        Edit Data Produk
                    </span>
                </div>
                <div style={{ border: "1px solid black" }}>
                    <Form onSubmit={handleSubmit}>
                        <Row lg={1} className="g-3 p-4">
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Nama</span>
                                <InputGroup>
                                    <Form.Control
                                        type='text'
                                        style={{ border: "1px solid black" }}
                                        placeholder="Nama Produk"
                                        name="nama"
                                        value={produk.nama}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Harga</span>
                                <InputGroup>
                                    <Form.Control
                                        style={{ border: "1px solid black" }}
                                        placeholder="Harga Produk"
                                        type="number"
                                        name="harga"
                                        value={produk.harga}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Kategori</span>
                                <InputGroup>
                                    <Form.Control
                                        type='number'
                                        style={{ border: "1px solid black" }}
                                        placeholder="Kategori Produk"
                                        name="kategori"
                                        value={produk.kategori.id}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Stok</span>
                                <InputGroup>
                                    <Form.Control
                                        style={{ border: "1px solid black" }}
                                        placeholder="Stok Produk"
                                        type="number"
                                        name="stok"
                                        value={produk.stok}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Deskripsi</span>
                                <Row lg={2}>
                                    <Col>
                                        <InputGroup>
                                            <Form.Control
                                                style={{ border: "1px solid black" }}
                                                placeholder="Deskripsi Produk"
                                                as="textarea"
                                                name="deskripsi"
                                                value={produk.deskripsi}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Unggah Gambar</span>
                                        <InputGroup>
                                            <Form.Control
                                                style={{ border: "1px solid black" }}
                                                placeholder="Unggah Gambar Produk"
                                                type="file"
                                                name="gambar"
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
                                    Update
                                </Button>
                                <Button onClick={() => navigate(`/admin`)} variant="secondary" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                    Kembali
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default UpdateProduk;
