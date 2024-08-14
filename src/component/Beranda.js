import React, { useEffect, useState } from 'react';
import NavigationBar from "./NavigationBar";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import kertasHvs from "../asset/kertas-hvs.png";
import botol from '../asset/botol.png'

const Beranda = () => {
    const navigate = useNavigate();
    const [kategori, setKategori] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/kategori')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data fetched:', data);  // Logging data
                if (Array.isArray(data)) {
                    setKategori(data);
                } else {
                    setError('Data yang diterima bukan array');
                    console.error('Data yang diterima bukan array:', data);
                }
            })
            .catch(error => {
                setError('Error fetching data');
                console.error('Error fetching kategori:', error);
            });
    }, []);

    return (
        <div>
            <NavigationBar />
            <div className="gambar">
                <Carousel style={{ border: "2px solid skyblue" }}>
                    <Carousel.Item>
                        <Image src={kertasHvs} className="d-block" style={{ height: 'auto', width: "100%", objectFit: 'cover' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={botol} className="d-block" style={{ height: 'auto', width: "100%", objectFit: 'cover' }} />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="mt-4">
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    <Row lg={4} className="text-center">
                        {kategori.map((item, index) => (
                            <Col key={index} className="mb-3 d-flex justify-content-center">
                                <a onClick={() => navigate(`/produk/${item.id}`)} style={{ textDecoration: 'none', display: "inline-block", width: "80%", color: "black" }}>
                                    <div style={{ backgroundColor: "skyblue", width: "100%", borderRadius: "50px" }}>{item.nama}</div>
                                </a>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default Beranda;
