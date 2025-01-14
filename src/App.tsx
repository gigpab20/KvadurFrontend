// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogue from './components/Catalogue';
import './App.css';
import { LanguageProvider } from "./components/LanguageContext";
import { CartProvider } from "./components/CartContext";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import Impressum from "./components/Impressum";
import Datenschutzerklaerung from "./components/Datenschutzerklaerung";

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
        fetch('http://mirfac.uberspace.de/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <LanguageProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogue" element={<Catalogue products={products} />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/impressum" element={<Impressum/>}/>
                        <Route path="/datenschutzerklaerung" element={<Datenschutzerklaerung />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </CartProvider>
        </LanguageProvider>
    );
}

export default App;
