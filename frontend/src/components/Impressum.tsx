import React, { useContext, useState } from 'react';
import Annoucement from "./Annoucement";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LanguageContext } from './LanguageContext';

const Impressum = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useContext(LanguageContext);


    const texts: { [key: string]: any } = {
        DE: {
            title: 'Impressum',
            contact: 'Kontakt',
            responsible: 'Redaktionell verantwortlich',
            address: 'Am Stübingeracker, 6A\n8055 Graz',
            consumerDispute: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle',
            disputeInfo: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
            source: 'Quelle'
        },
        EN: {
            title: 'Imprint',
            contact: 'Contact',
            responsible: 'Editorially responsible',
            address: 'Am Stübingeracker, 6A\n8055 Graz',
            consumerDispute: 'Consumer dispute resolution/Universal arbitration board',
            disputeInfo: 'We are neither willing nor obliged to participate in dispute resolution procedures before a consumer arbitration board.',
            source: 'Source'
        }
    };

    const currentTexts = texts[language];

    return (
        <div style={{textAlign:"center"}}>
            <Annoucement />
            <Navbar onSearch={setSearchTerm} />
            <h1>{currentTexts.title}</h1>
            <p>Jonas Graschi<br />
                KVADUR Streetwear<br />
                {currentTexts.address}</p>
            <h2>{currentTexts.contact}</h2>
            <p>Telefon: +43 06641852157<br />
                E-Mail: jonas.brunner0228@gmail.com</p>
            <h2>{currentTexts.responsible}</h2>
            <p>Jonas Graschi<br />
                {currentTexts.address}</p>
            <h2>{currentTexts.consumerDispute}</h2>
            <p>{currentTexts.disputeInfo}</p>
            <p>{currentTexts.source}: <a href="https://www.e-recht24.de">e-recht24.de</a></p>
            <Footer />
        </div>
    );
};

export default Impressum;
