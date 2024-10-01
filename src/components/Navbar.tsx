import React from 'react';
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {Badge} from "@mui/material";
import kvadurImage from "../pics/kvadur.png"
import {Link} from "react-router-dom";


const Container = styled.div`
        height: 60px;
`

const Wrapper = styled.div`
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;`

const Language = styled.span`
        font-size: 14px;
        cursor: pointer;
`

const SearchContainer = styled.div`
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        margin-left: 25px;
        padding: 5px`

const Input = styled.input`
        border: none`

const Logo = styled.h1`
        font-weight: bold;`

const Left = styled.div`
        flex:1;
        display:flex;
        align-items: center;`
const Right = styled.div`
        flex:1;
        display:flex;
        align-items: center;
        justify-content: flex-end;`
const Center = styled.div`
        flex:1;
        text-align:center;`

const MenuItem = styled.div`
        font-size: 14px;
        cursor: pointer;
        margin-left: 25px;`


const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input/>
                        <FaSearch style={{color:'gray', fontSize:16}}/>
                    </SearchContainer>
                    <Link to={"/catalogue"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Katalog
                    </Link>
                </Left>
                <Center> <img src={kvadurImage} alt="Kvadur" style={{ width: '100px', height: 'auto' }}/></Center>
                <Right>
                <MenuItem>
                        <Badge badgeContent={4} color={"secondary"}>
                            <FaShoppingCart  size={"30px"}/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;