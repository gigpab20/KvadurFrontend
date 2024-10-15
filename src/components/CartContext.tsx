import React, { createContext, useState, ReactNode } from 'react';

interface CartContextProps {
    cartItems: number;
    addToCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
    cartItems: 0,
    addToCart: () => {},
});

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState(0);

    const addToCart = () => {
        setCartItems(prev => prev + 1);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
