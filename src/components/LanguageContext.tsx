import React, { createContext, useState, ReactNode } from 'react';

interface LanguageContextProps {
    language: string;
    setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    language: 'DE',
    setLanguage: () => {},
});

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState('DE');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
