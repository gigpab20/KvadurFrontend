import React from 'react';
import '../css/Startpage.css'

const products = [
    {
        id: 1,
        name: 'Produkt 1',
        description: 'Beschreibung für Produkt 1',
        image: '/pics/product1.jpg',
        price: '19.99€',
    },
    {
        id: 2,
        name: 'Produkt 2',
        description: 'Beschreibung für Produkt 2',
        image: '/pics/product2.jpg',
        price: '29.99€',
    },
    {
        id: 3,
        name: 'Produkt 3',
        description: 'Beschreibung für Produkt 3',
        image: '/pics/product3.jpg',
        price: '39.99€',
    },
];

const Startpage = () => {
    return (
        <div className="product-list-container">
            <h1>Unsere Produkte</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">{product.price}</p>
                        <button className="buy-button">Kaufen</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Startpage;