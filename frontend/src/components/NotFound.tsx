// src/components/NotFound.tsx
import React, { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const NotFound: React.FC = () => {
    const { language } = useContext(LanguageContext);

    const texts: { [key: string]: any } = {
        DE: {
            title: 'Seite nicht gefunden',
            message: 'Die von dir angeforderte Seite existiert nicht.',
        },
        EN: {
            title: 'Page Not Found',
            message: 'The page you are looking for does not exist.',
        },
    };

    const currentTexts = texts[language];

    return (
        <div className="error-404">
            <h1>{currentTexts.title}</h1>
            <p>{currentTexts.message}</p>
        </div>
    );
};

export default NotFound;
