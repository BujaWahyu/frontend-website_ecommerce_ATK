import React, { useState } from 'react';
import keranjang from '../asset/keranjang-removebg-preview.png';

function Keranjang({ item, onDelete }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  const handleDeleteClick = () => {
    onDelete(); // Panggil onDelete yang diterima dari prop
  };

  return (
    <div className="cart-item">
      <img src={require(`../asset/${item.produk.gambar}`)} alt="keranjang" />
      <div className="item-details">
        <h2>{item.produk.nama}</h2>
        <select disabled>
          <option>{item.produk.kategori.nama}</option>
        </select>
        <p className="price">Rp {item.produk.harga}</p>
        <div className="quantity-control">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>
      <div className="action-buttons">
        <button className="delete-button" onClick={handleDeleteClick}>Hapus</button>
      </div>
    </div>
  );
}

export default Keranjang;
