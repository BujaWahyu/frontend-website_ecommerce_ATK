import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('nama');
        if (query) {
            axios.get(`http://localhost:3000/produk?nama=${query}`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        }
    }, [location.search]);

    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.nama}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
