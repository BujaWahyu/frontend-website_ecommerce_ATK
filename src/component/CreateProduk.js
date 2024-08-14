import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Form, InputGroup, Row, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const CreateProduk = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nama: '',
        deskripsi: '',
        harga: '',
        kategori: '',
        stok: '',
        gambar: null
    });

    const [kategoriList, setKategoriList] = useState([]);

    useEffect(() => {
        fetchKategoriList();
    }, []);

    const fetchKategoriList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/kategori');
            setKategoriList(response.data);  // Assuming response.data is an array of kategori objects with `id` and `nama`
        } catch (error) {
            console.error('Failed to fetch kategori list:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            gambar: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedHarga = parseInt(formData.harga);
        const parsedKategori = parseInt(formData.kategori);
        const parsedStok = parseInt(formData.stok);

        try {
            const response = await axios.post('http://localhost:3000/produk', {
                nama: formData.nama,
                deskripsi: formData.deskripsi,
                harga: isNaN(parsedHarga) ? 0 : parsedHarga,
                kategori: isNaN(parsedKategori) ? 0 : parsedKategori,
                stok: isNaN(parsedStok) ? 0 : parsedStok,
                gambar: formData.gambar ? formData.gambar.name : 'Tinta4.jpg'
            });

            alert('Produk berhasil dibuat:', response.data);
            // Tambahkan logika untuk memberikan feedback kepada pengguna jika berhasil
        } catch (error) {
            if (error.response) {
                alert('Gagal membuat produk:', error.response.data);
                // Tambahkan logika untuk menangani error dari backend
            } else {
                alert('Gagal membuat produk:', error.message);
                // Tambahkan logika untuk menangani error dari koneksi atau request
            }
        }
    };

    return (
        <div style={{ height: "90vh", width: "100vw" }}>
            <Container className="pt-4">
                <div style={{ backgroundColor: "green", padding: "10px" }}>
                    <span style={{ fontSize: "19px", fontWeight: "500", fontFamily: "sans-serif", color: "whitesmoke" }}>
                        Tambah Data Produk
                    </span>
                </div>
                <div style={{ border: "1px solid black" }}>
                    <Form onSubmit={handleSubmit}>
                        <Row lg={1} className="g-3 p-4">
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Nama</span>
                                <InputGroup>
                                    <Form.Control
                                        type='Text'
                                        style={{ border: "1px solid black" }}
                                        placeholder="Nama Produk"
                                        name="nama"
                                        value={formData.nama}
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
                                        value={formData.harga}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span style={{ fontSize: "17px", fontFamily: "sans-serif" }}>Kategori</span>
                                <InputGroup>
                                    <Form.Control
                                        style={{ border: "1px solid black" }}
                                        placeholder="Pilih Kategori"
                                        as="select"
                                        name="kategori"
                                        value={formData.kategori}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {kategoriList.map((kategori) => (
                                            <option key={kategori.id} value={kategori.id}>{kategori.nama}</option>
                                        ))}
                                    </Form.Control>
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
                                        value={formData.stok}
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
                                                type='Text'
                                                style={{ border: "1px solid black" }}
                                                placeholder="Deskripsi Produk"
                                                as="textarea"
                                                name="deskripsi"
                                                value={formData.deskripsi}
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
                                                onChange={handleFileChange}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Button variant="success" type="submit" style={{ marginTop: "20px" }}>
                                    Simpan
                                </Button>
                                <Button onClick={()=>navigate("/admin")} variant="secondary" style={{ marginTop: "20px", marginLeft: "10px" }}>
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

export default CreateProduk;
