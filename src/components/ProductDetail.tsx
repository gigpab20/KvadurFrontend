// src/components/ProductDetail.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Annoucement from './Annoucement';
import { LanguageContext } from '../components/LanguageContext';

// Static image imports
import teeImage from '../pics/tee.png';
import zipperImage from '../pics/zipper.png';

const imageMap: { [key: string]: string } = {
    tee: teeImage,
    zipper: zipperImage,
    // Add other images here
};

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

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        fetch(`http//mirfac.uberspace.de:46081/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data.product);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const texts: { [key: string]: any } = {
        DE: {
            material: 'Material',
        },
        EN: {
            material: 'Material',
        },
    };

    const currentTexts = texts[language];

    return (
        <div>
            <Annoucement />
            <Navbar />
            <div className="product-detail">
                <h1 className="product-title">{product.title}</h1>
                <img
                    src={imageMap[product.img] || ''}
                    alt={product.title}
                    className="product-img"
                />
                <p className="product-price">{`${product.price} ${product.currency}`}</p>
                <p className="product-desc">{product.desc.join(', ')}</p>
                <p className="product-guidance">{product.guidance}</p>
                <p className="product-fabric">{`${currentTexts.material}: ${product.fabric}`}</p>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
