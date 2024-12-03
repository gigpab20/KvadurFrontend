import React from 'react';
import styled from "styled-components";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Badge } from "@mui/material";
import kvadurImage from "../pics/kvadur.png";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 100px; /* Erhöht, um mehr Platz für das Logo zu schaffen */
    background-color: #f8f9fa;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
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
    width: 300px; /* Breiter für mehr Platz */

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
    width: 100%; /* Stellt sicher, dass das Input-Feld den ganzen Platz nutzt */
    font-size: 16px;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
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
    object-fit: contain; /* Verhindert das Abschneiden des Logos */
`;

const MenuItem = styled.div`
    font-size: 16px;
    cursor: pointer;
    margin-left: 35px;
`;

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search..." />
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
                        Katalog
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
                        Kontakt
                    </Link>
                </Left>
                <Center>
                    <Link to="/">
                        <LogoImage src={kvadurImage} alt="Kvadur" />
                    </Link>
                </Center>
                <Right>
                    <MenuItem>
                        <Badge badgeContent={0} color="secondary">
                            <FaShoppingCart size="30px" />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;