// src/components/Annoucement.tsx
import React, { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext } from '../components/LanguageContext';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
`;

const Annoucement: React.FC = () => {
    const { language } = useContext(LanguageContext);

    const texts: { [key: string]: any } = {
        DE: 'Super Angebot! Kostenloser Versand bei Bestellungen über 80€!',
        EN: 'Great Deal! Free shipping on orders over €80!',
    };

    return (
        <Container>
            {texts[language]}
        </Container>
    );
};

export default Annoucement;
