import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import profileImage from '../asset/profil.jpeg'; // Ganti dengan path gambar profil yang Anda miliki
import axios from 'axios';

const Profil = () => {
    const [userData, setUserData] = useState(null); // Mengubah menjadi null atau objek kosong
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/2'); // Ganti dengan URL sesuai endpoint Anda
                setUserData(response.data); // Mengatur data pengguna yang diterima dari server
            } catch (error) {
                setError(error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        // const file = e.target.files[0];
        // Handle file upload logic here (if needed)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kirim data yang diperbarui ke server
            const response = await axios.patch(`http://localhost:3000/users/${userData.id}`, {
                nama: userData.name,
                email: userData.email,
                alamat: userData.alamat,
                // Tambahkan field lain sesuai kebutuhan (misal: fotoProfil)
            });

            console.log('Data pengguna berhasil diperbarui:', response.data);
            // Tambahkan logika lain seperti notifikasi atau redirect ke halaman lain
        } catch (error) {
            console.error('Gagal memperbarui data pengguna:', error);
            // Tambahkan logika untuk menangani error, misalnya menampilkan pesan kesalahan
        }
    };

    if (!userData) {
        return <p>Loading...</p>; // Menampilkan pesan loading selama data sedang diambil
    }

    if (error) {
        return <p>Error: {error.message}</p>; // Menampilkan pesan error jika terjadi kesalahan
    }

    return (
        <div style={{ height: "60vh", width: "60vw", border: "1px solid black", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "skyblue" }}>
            <Container style={{ height: "100%" }}>
                <Row lg={2} style={{ height: "100%" }}>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Image src={profileImage} width="200" height="220" style={{ borderRadius: "50%" }} />
                    </Col>
                    <Col>
                        <Row lg={1}>
                            <Col>
                                <span className="pb-5" style={{ fontFamily: "Vibur, cursive", fontSize: "16px" }}>Nama:</span>
                                <InputGroup>
                                    <Form.Control
                                        name="name" // Ganti dengan "name" untuk memenuhi preferensi Anda
                                        value={userData.name} // Menggunakan userData.name dari state
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span className="pb-5" style={{ fontFamily: "Vibur, cursive", fontSize: "16px" }}>Email:</span>
                                <InputGroup>
                                    <Form.Control
                                        name="email" // Ganti dengan "email"
                                        value={userData.email} // Menggunakan userData.email dari state
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span className="pb-5" style={{ fontFamily: "Vibur, cursive", fontSize: "16px" }}>Alamat:</span>
                                <InputGroup>
                                    <Form.Control
                                        name="alamat" // Ganti dengan "alamat"
                                        value={userData.alamat} // Menggunakan userData.alamat dari state
                                        onChange={handleInputChange}
                                        as="textarea"
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <span className="pb-5" style={{ fontFamily: "Vibur, cursive", fontSize: "16px" }}>Upload Gambar:</span>
                                <InputGroup>
                                    <Form.Control
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col className="text-center">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{ marginTop: "20px" }}
                                >
                                    Update
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profil;
