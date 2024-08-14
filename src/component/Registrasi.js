const { Container, Row, Col, InputGroup, Form, Button } = require("react-bootstrap")

const Registrasi = () => {

    const handleSubmit= (e) => {
        alert('Berhasil di Simpan')
    };

    return(
        <div style={{border:"1px solid black", height:"80vh", width:"35vw", boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor:"white"}}>
            <Container>
                <Row lg={1}>
                    <Col className="text-center" style={{fontFamily:"Vibur, cursive", fontSize:"40px", fontWeight:"600"}}> 
                        <span>Registrasi</span> 
                    </Col>
                    <Col className="text-center"> 
                        <span  style={{fontFamily:"Vibur, cursive", fontSize:"15px"}}>Isi Data Anda Dengan Lengkap</span>
                    </Col>
                    <Col className="pt-3">
                        <InputGroup>
                            <Form.Control
                                style={{ backgroundColor: '#D9D9D9' }}
                                placeholder="Masukan Nama"
                            />
                        </InputGroup>
                    </Col>
                    <Col className="pt-3">
                        <InputGroup>
                            <Form.Control
                                type="email"
                                style={{ backgroundColor: '#D9D9D9' }}
                                placeholder="Masukan Email"
                            />
                        </InputGroup>
                    </Col>
                    <Col className="pt-3">
                        <InputGroup>
                            <Form.Control
                                type="password"
                                style={{ backgroundColor: '#D9D9D9' }}
                                placeholder="Masukan Password"
                            />
                        </InputGroup>
                    </Col>
                    <Col className="pt-3">
                        <span>Upload Profil</span>
                        <InputGroup>
                            <Form.Control
                                type="file"
                                style={{ backgroundColor: '#D9D9D9' }}
                                placeholder="Unggah Gambar"
                            />
                        </InputGroup>
                    </Col>
                    <Col className="pt-3">
                        <InputGroup>
                            <Form.Control
                                style={{ backgroundColor: '#D9D9D9' }}
                                placeholder="Masukan Alamat"
                                as="textarea"
                            />
                        </InputGroup>
                    </Col>
                    <Col className="text-center pt-3">
                        <Button onClick={handleSubmit} variant="outline-primary">
                            Registrasi
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Registrasi;