// src/components/Navbar.tsx
import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { Badge } from "@mui/material";
import kvadurImage from "../pics/kvadur.png";
import { Link } from "react-router-dom";
import { LanguageContext } from '../components/LanguageContext';
import { CartContext } from '../components/CartContext';

// Styled Components
const Container = styled.div`
    height: 100px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    position: relative;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    padding: 10px;
    border-radius: 25px;
    background-color: #e9ecef;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: 300px;

    &:hover {
        background-color: #dee2e6;
    }

    &:focus-within {
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const Input = styled.input`
    border: none;
    outline: none;
    background: transparent;
    padding: 0 10px;
    width: 100%;
    font-size: 16px;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const LogoImage = styled.img`
    width: 120px;
    height: auto;
    object-fit: contain;
`;

const MenuItem = styled.div`
    font-size: 16px;
    cursor: pointer;
    margin-left: 35px;
`;

const MobileMenuIcon = styled.div`
    display: none;
    font-size: 24px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    a {
        margin-bottom: 20px;
        font-size: 18px;
        color: inherit;
        text-decoration: none;
    }
`;

// Navbar Component
interface NavbarProps {
    onSearch?: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, setLanguage } = useContext(LanguageContext);
    const { cartItems } = useContext(CartContext);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const texts: { [key: string]: any } = {
        DE: {
            catalogue: 'Katalog',
            contact: 'Kontakt',
            searchPlaceholder: 'Suche...',
        },
        EN: {
            catalogue: 'Catalogue',
            contact: 'Contact',
            searchPlaceholder: 'Search...',
        },
    };

    const currentTexts = texts[language];

    return (
        <Container>
            <Wrapper>
                <MobileMenuIcon className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <FaBars />
                </MobileMenuIcon>
                <Left>
                    <select
                        className="language-switcher"
                        value={language}
                        onChange={handleLanguageChange}
                        style={{ marginRight: '20px' }}
                    >
                        <option value="DE">DE</option>
                        <option value="EN">EN</option>
                    </select>
                    <SearchContainer>
                        <Input
                            placeholder={currentTexts.searchPlaceholder}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <FaSearch style={{ color: 'gray', fontSize: 20 }} />
                    </SearchContainer>
                    <Link
                        to="/catalogue"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            marginLeft: '50px',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        {currentTexts.catalogue}
                    </Link>
                    <Link
                        to="/contact"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            marginLeft: '50px',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        {currentTexts.contact}
                    </Link>
                </Left>
                <Center>
                    <Link to="/">
                        <LogoImage src={kvadurImage} alt="Kvadur" />
                    </Link>
                </Center>
                <Right>
                    <MenuItem>
                        <Badge badgeContent={cartItems.length} color="secondary">
                            <FaShoppingCart size="30px" className="fa-shopping-cart" />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
            {isMobileMenuOpen && (
                <MobileMenu className="mobile-menu">
                    <Link to="/catalogue" onClick={() => setIsMobileMenuOpen(false)}>{currentTexts.catalogue}</Link>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{currentTexts.contact}</Link>
                </MobileMenu>
            )}
        </Container>
    );
};

export default Navbar;
