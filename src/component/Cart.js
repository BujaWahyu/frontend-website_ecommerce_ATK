import React, { useEffect, useState } from 'react';
import '../style/cart.css';
import Keranjang from './Keranjang';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/keranjang');
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/keranjang/${itemId}`);
      // Setelah penghapusan berhasil, perbarui state items untuk merender ulang
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout')
  };

  const handleGoBack = () => {
    alert('Going back!');
  };

  const displayedItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="cart-page">
      <h1>Keranjang ({items.length})</h1>
      <Row lg={1}>
        {displayedItems.map((item) => (
          <Col key={item.id}>
            <Keranjang item={item} onDelete={() => handleDeleteItem(item.id)} />
          </Col>
        ))}
      </Row>
      <div className="pagination-buttons" style={{ display: 'flex', justifyContent:"center", marginTop: '5px' }}>
        {currentPage > 0 && (
          <Button className="next-button" onClick={handlePrevPage} style={{ marginRight: '5px' }} variant="outline-primary">
            Back
          </Button>
        )}
        {items.length > itemsPerPage && currentPage < totalPages - 1 && (
          <Button className="next-button" onClick={handleNextPage} variant="outline-success">
            Next
          </Button>
        )}
      </div>
      <div className="checkout-button" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <Button onClick={handleGoBack} style={{ marginRight: '10px' }} variant="secondary">
          Kembali
        </Button>
        <Button onClick={() => navigate("/checkout")} variant="primary">
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
