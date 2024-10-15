import React, { createContext, useState, ReactNode } from 'react';

// Definiere das Interface für die Produktinformationen im Warenkorb
interface CartItem {
    product: Product;
    size: string;
}

interface CartContextProps {
    cartItems: CartItem[];  // Liste von Produkten im Warenkorb
    addToCart: (product: Product, size: string) => void;
}

export const CartContext = createContext<CartContextProps>({
    cartItems: [],
    addToCart: () => {},
});

interface CartProviderProps {
    children: ReactNode;
}

// Definiere das Interface für ein Produkt
interface Product {
    id: number;
    title: string;
    price: string;
    currency: string;
    img: string;
    sizes: { size: string; stock: number }[];
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, size: string) => {
        setCartItems(prevItems => [...prevItems, { product, size }]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
