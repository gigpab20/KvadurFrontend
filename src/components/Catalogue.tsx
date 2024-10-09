import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Annoucement from "./Annoucement";
import "../css/Catalogue.css"

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

const Catalogue = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // Fetch data from the API
    useEffect(() => {
        fetch('http://localhost:3003/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    console.log(products)
    return (
        <div>
            <Annoucement/>
            <Navbar/>
            <h1>Unsere Produkte</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <img
                            src={require(`../pics/${product.img}.png`)}
                            alt={product.title}
                            className="product-img"
                        />
                        <p className="product-title">{product.title}</p>
                        <p className="product-price">{`${product.price} ${product.currency}`}</p>
                        <button className="buy-button">Kaufen</button>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Catalogue;
