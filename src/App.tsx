import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogue from './components/Catalogue';
import ProductDetails from './components/ProductDetails';
import './App.css';

// Definiere das Interface für die Produkte
interface Product {
    id: number;
    title: string;
    color: string;
    img: string;
    desc: string[];
    guidance: string;
    sizes: { size: string; stock: number }[];
    price: string;
    currency: string;
    reviews: { starAmount: number; title: string; text: string }[];
    fabric: string;
}

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:3003/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Catalogue products={products} />} />
                <Route path="/product/:id" element={<ProductDetails products={products} />} />
            </Routes>
        </Router>
    );
}

export default App;
