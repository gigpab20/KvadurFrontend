// src/pages/Cart.tsx (oder src/components/Cart.tsx)
import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Annoucement from './Annoucement';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    const { cartItems } = useContext(CartContext);

    // Gesamtsumme errechnen
    const total = cartItems.reduce((acc, currentItem) => {
        const priceNum = parseFloat(currentItem.product.price);
        return acc + priceNum;
    }, 0);

    return (
        <div>
            <Annoucement />
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Dein Warenkorb</h1>
                {cartItems.length === 0

                    ? (
                    <p>Dein Warenkorb ist leer.</p>
                ) : (
                    <div>
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    marginBottom: '10px'
                                }}
                            >
                                <p><strong>Produkt:</strong> {item.product.title}</p>
                                <p><strong>Größe:</strong> {item.size}</p>
                                <p><strong>Preis:</strong> {item.product.price} {item.product.currency}</p>
                                {/* Hier könntest du noch einen Button zum Entfernen einzelner Cart-Items integrieren */}
                            </div>
                        ))}

                        <h2>Gesamt: {total.toFixed(2)} EUR</h2>
                        <Link
                            to="/checkout"
                            style={{
                                display: 'inline-block',
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                textDecoration: 'none',
                                marginTop: '10px'
                            }}
                        >
                            Weiter zur Kasse
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
