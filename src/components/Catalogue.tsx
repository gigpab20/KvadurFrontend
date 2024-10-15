<<<<<<< Updated upstream
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Annoucement from './Annoucement';
import Modal from './Modal';
import '../css/Catalogue.css';
=======
// src/components/Catalogue.tsx
import React, { useEffect, useState, useContext } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Annoucement from "./Annoucement";
import { LanguageContext } from '../components/LanguageContext';
import "../css/Catalogue.css";
import { CartContext } from '../components/CartContext';

// Static image imports
import teeImage from '../pics/tee.png';
import zipperImage from '../pics/zipper.png';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
interface CatalogueProps {
    products: Product[];
}

const Catalogue: React.FC<CatalogueProps> = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [sizeSelectionOpen, setSizeSelectionOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setSizeSelectionOpen(false);
        setSelectedSize(null); // Auswahl der Größe zurücksetzen
    };

    const openSizeSelection = (product: Product) => {
        setSelectedProduct(product);
        setSizeSelectionOpen(true);
    };

    const handleSizeSelection = (size: string) => {
        if (selectedSize === size) {
            // Wenn die Größe bereits ausgewählt ist, hebe die Auswahl auf
            setSelectedSize(null);
        } else {
            // Andernfalls setze die ausgewählte Größe
            setSelectedSize(size);
        }
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            alert(`Produkt ${selectedProduct?.title} in Größe ${selectedSize} wurde in den Warenkorb gelegt!`);
            closeModal(); // Modal schließen und zur Übersicht zurückkehren
        }
    };

    return (
        <div>
            <Annoucement />
            <Navbar />
            <h1 style={{textAlign:"center"}}>Unsere Produkte</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product.id}
                    >
=======
const imageMap: { [key: string]: string } = {
    tee: teeImage,
    zipper: zipperImage,
    // Weitere Bilder hier hinzufügen
};

const Catalogue: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useContext(LanguageContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch('http://localhost:3003/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const texts: { [key: string]: any } = {
        DE: {
            title: 'Unsere Produkte',
            buy: 'Kaufen',
        },
        EN: {
            title: 'Our Products',
            buy: 'Buy',
        },
    };

    const currentTexts = texts[language];

    return (
        <div>
            <Annoucement />
            <Navbar onSearch={setSearchTerm} />
            <h1>{currentTexts.title}</h1>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div className="product-card" key={product.id}>
>>>>>>> Stashed changes
                        <img
                            src={imageMap[product.img] || ''}
                            alt={product.title}
                            className="product-img"
                            onClick={() => openModal(product)}
                        />
                        <p className="product-title">{product.title}</p>
                        <p className="product-price">{`${product.price} ${product.currency}`}</p>
<<<<<<< Updated upstream
                        {/* Kaufen-Button, der das Größenwahl-Popup öffnet */}
                        <button className="buy-button" onClick={() => openSizeSelection(product)}>
                            Kaufen
=======
                        <button
                            className="buy-button"
                            onClick={addToCart}
                        >
                            {currentTexts.buy}
>>>>>>> Stashed changes
                        </button>
                    </div>
                ))}
            </div>
<<<<<<< Updated upstream

            <Footer />

            {/* Modal für Produktdetails (falls notwendig) */}
            <Modal isOpen={!!selectedProduct && !sizeSelectionOpen} onClose={closeModal}>
                {selectedProduct && (
                    <div className="product-details">
                        <img
                            src={require(`../pics/${selectedProduct.img}.png`)}
                            alt={selectedProduct.title}
                            className="product-img"
                        />
                        <h1>{selectedProduct.title}</h1>
                        <p>{`${selectedProduct.price} ${selectedProduct.currency}`}</p>
                        <p>{`Farbe: ${selectedProduct.color}`}</p>
                        <p>{`Stoff: ${selectedProduct.fabric}`}</p>
                        <div className="product-description">
                            <h2>Beschreibung</h2>
                            <ul>
                                {selectedProduct.desc.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-guidance">
                            <h2>Pflegehinweise</h2>
                            <p>{selectedProduct.guidance}</p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal für Größenwahl */}
            <Modal isOpen={sizeSelectionOpen} onClose={closeModal}>
                {selectedProduct && (
                    <div className="size-selection">
                        <h2>Wähle eine Größe für {selectedProduct.title}</h2>
                        <div className="sizes-grid">
                            {selectedProduct.sizes.map((sizeObj) => (
                                <button
                                    key={sizeObj.size}
                                    className={`size-button ${selectedSize === sizeObj.size ? 'selected' : ''}`}
                                    onClick={() => handleSizeSelection(sizeObj.size)}
                                    disabled={sizeObj.stock <= 0} // Deaktiviere, wenn kein Lagerbestand vorhanden
                                >
                                    {sizeObj.size} {sizeObj.stock <= 0 ? '(Nicht verfügbar)' : ''}
                                </button>
                            ))}
                        </div>
                        {/* In den Warenkorb Button wird angezeigt, wenn eine Größe ausgewählt wurde */}
                        {selectedSize && (
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
                                In den Warenkorb
                            </button>
                        )}
                    </div>
                )}
            </Modal>
=======
            <Footer />
>>>>>>> Stashed changes
        </div>
    );
};

export default Catalogue;
