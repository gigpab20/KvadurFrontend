// src/components/Checkout/Checkout.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/Checkout.css";
import { CartContext } from "./CartContext";
import Annoucement from "./Annoucement";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Checkout: React.FC = () => {
    // Tabs Zustand (0 = Warenkorb, 1 = Versand/Adresse, 2 = Zahlung, 3 = Review)
    const [activeTab, setActiveTab] = useState<number>(0);

    // Formulardaten
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    // Cart aus dem Context
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // Gesamtsumme berechnen
    const total = cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.product.price);
    }, 0);

    // Bestellung abschließen
    const handleSubmit = () => {
        // Normalerweise würdest du hier deinen Server-Call machen
        alert('Vielen Dank für deine Bestellung!');
        // Optional: Danach redirect zur Startseite / Bestellbestätigungs-Seite
        navigate('/');
    };

    // RENDER-Funktionen für jeden Tab
    const renderCartSummaryTab = () => (
        <div className="tab-content">
            <h2 className="section-title">Warenkorb</h2>
            {cartItems.length === 0 ? (
                <p>Dein Warenkorb ist leer.</p>
            ) : (
                <>
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="cart-item">
                            <p>
                                <strong>{item.product.title}</strong> ({item.size})
                            </p>
                            <p>
                                {item.product.price} {item.product.currency}
                            </p>
                        </div>
                    ))}
                    <h3 className="cart-total">Gesamt: {total.toFixed(2)} EUR</h3>
                </>
            )}
            <button
                className="button next-button"
                onClick={() => setActiveTab(1)}
                disabled={cartItems.length === 0}
            >
                Weiter
            </button>
        </div>
    );

    const renderShippingTab = () => (
        <div className="tab-content">
            <h2 className="section-title">Lieferadresse</h2>

            <div className="form-group">
                <label>Vorname</label>
                {/* NEU: name="firstName" */}
                <input
                    name="firstName"
                    className="input-field"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Nachname</label>
                {/* NEU: name="lastName" */}
                <input
                    name="lastName"
                    className="input-field"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Adresse</label>
                {/* NEU: name="address" */}
                <input
                    name="address"
                    className="input-field"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>PLZ</label>
                {/* NEU: name="zip" */}
                <input
                    name="zip"
                    className="input-field"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Stadt</label>
                {/* NEU: name="city" */}
                <input
                    name="city"
                    className="input-field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Land</label>
                {/* NEU: name="country" */}
                <input
                    name="country"
                    className="input-field"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>

            <button className="button next-button" onClick={() => setActiveTab(2)}>
                Weiter
            </button>
        </div>
    );

    const renderPaymentTab = () => (
        <div className="tab-content">
            <h2 className="section-title">Zahlungsmethode</h2>
            <div className="form-group">
                <label>Wähle deine Zahlungsart</label>
                <select
                    className="input-field"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Bitte auswählen...</option>
                    <option value="creditCard">Kreditkarte</option>
                    <option value="paypal">PayPal</option>
                    <option value="klarna">Klarna</option>
                    {/* Weitere Payment-Optionen */}
                </select>
            </div>
            <button
                className="button next-button"
                onClick={() => setActiveTab(3)}
                disabled={!paymentMethod}
            >
                Weiter
            </button>
        </div>
    );

    const renderReviewTab = () => (
        <div className="tab-content">
            <h2 className="section-title">Bestellung prüfen</h2>
            <div className="review-section">
                <h4>Lieferadresse</h4>
                <p>
                    {firstName} {lastName}
                </p>
                <p>{address}</p>
                <p>
                    {zipCode} {city}
                </p>
                <p>{country}</p>
            </div>

            <div className="review-section">
                <h4>Zahlungsart</h4>
                <p>{paymentMethod}</p>
            </div>

            <div className="review-section">
                <h4>Produkte</h4>
                {cartItems.map((item, idx) => (
                    <p key={idx}>
                        {item.product.title} ({item.size}) - {item.product.price}{' '}
                        {item.product.currency}
                    </p>
                ))}
                <p className="cart-total">Gesamt: {total.toFixed(2)} EUR</p>
            </div>

            {/* NEU: type="submit" */}
            <button type="submit" className="button submit-button" onClick={handleSubmit}>
                Jetzt kaufen
            </button>
        </div>
    );

    return (
        <div>
            <Annoucement />
            <Navbar />
            <div className="checkout-container">
                <h1>Checkout</h1>
                {/* Tabs Navigation */}
                <div className="tabs-container">
                    <div
                        className={`tab ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Warenkorb
                    </div>
                    <div
                        className={`tab ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Lieferung
                    </div>
                    <div
                        className={`tab ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => setActiveTab(2)}
                    >
                        Zahlung
                    </div>
                    <div
                        className={`tab ${activeTab === 3 ? 'active' : ''}`}
                        onClick={() => setActiveTab(3)}
                    >
                        Review
                    </div>
                </div>

                {/* Tab-Inhalte */}
                {activeTab === 0 && renderCartSummaryTab()}
                {activeTab === 1 && renderShippingTab()}
                {activeTab === 2 && renderPaymentTab()}
                {activeTab === 3 && renderReviewTab()}
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
