<<<<<<< Updated upstream
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
=======
// src/App.tsx
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from "./components/Catalogue";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import { LanguageProvider } from './components/LanguageContext';
import { CartProvider } from './components/CartContext';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <Router>
            <Routes>
                <Route path="/" element={<Catalogue products={products} />} />
                <Route path="/product/:id" element={<ProductDetails products={products} />} />
            </Routes>
        </Router>
=======
        <LanguageProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogue" element={<Catalogue />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </CartProvider>
        </LanguageProvider>
>>>>>>> Stashed changes
    );
}

export default App;
