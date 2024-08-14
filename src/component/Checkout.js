import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"

const Checkout = () => {
    return(
        <div style={{ height: "67vh", width: "60vw", border: "1px solid black", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Container>
                <Row lg={1}>
                    <Col className="border p-3" style={{backgroundColor:"#808080"}}>
                        <span style={{fontFamily:"Vibur, cursive", fontSize:"20px"}}>Checkout</span>
                    </Col>
                    <Col className="pt-3">
                        <Row lg={2}>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Nama Depan"
                                        style={{border:"1px solid black"}}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Nama Belakang"
                                        style={{border:"1px solid black"}}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="pt-3">
                        <Row lg={2}>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Email"
                                        style={{border:"1px solid black"}}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Nomor Telepon"
                                        type="number"
                                        style={{border:"1px solid black"}}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="pt-3">
                        <span>Alamat</span>
                        <InputGroup>
                            <Form.Control
                                placeholder="Alamat"
                                as="textarea"
                                style={{border:"1px solid black"}}
                            />
                        </InputGroup>
                    </Col>
                    <Col className="pt-3">
                        <Row lg={2}>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Kota/Kabupaten"
                                        style={{border:"1px solid black"}}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Kode Pos"
                                        type="number"
                                        style={{border:"1px solid black"}}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="pt-3">
                        <Button variant="primary">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Checkout;