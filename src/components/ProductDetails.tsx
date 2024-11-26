import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Annoucement from "./Annoucement";
import '../css/Catalogue.css'
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

interface ProductDetailsProps {
    products: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products }) => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((product) => product.id === parseInt(id || '', 10));

    if (!product) {
        return <div>Produkt nicht gefunden</div>;
    }

    return (
        <div>
            <Annoucement />
            <Navbar />
            <div className="product-details">
                <img
                    src={require(`../pics/${product.img}.png`)}
                    alt={product.title}
                    className="product-img"
                />
                <h1>{product.title}</h1>
                <p>{`${product.price} ${product.currency}`}</p>
                <p>{`Farbe: ${product.color}`}</p>
                <p>{`Stoff: ${product.fabric}`}</p>
                <div className="product-description">
                    <h2>Beschreibung</h2>
                    <ul>
                        {product.desc.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
                <div className="product-guidance">
                    <h2>Pflegehinweise</h2>
                    <p>{product.guidance}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;