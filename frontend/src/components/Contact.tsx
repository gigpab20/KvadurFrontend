// src/components/Contact.tsx
import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Annoucement from './Annoucement';
import { LanguageContext } from '../components/LanguageContext';
import '../css/Contact.css';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface Errors {
    name?: string;
    email?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<Errors>({});
    const [success, setSuccess] = useState(false);
    const { language } = useContext(LanguageContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validierung durchführen
        let validationErrors: Errors = {};
        if (!formData.name) validationErrors.name = language === 'DE' ? 'Name ist erforderlich' : 'Name is required';
        if (!formData.email) validationErrors.email = language === 'DE' ? 'E-Mail ist erforderlich' : 'Email is required';
        if (!formData.message) validationErrors.message = language === 'DE' ? 'Nachricht ist erforderlich' : 'Message is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setSuccess(true);
            // Formular absenden (API-Aufruf oder ähnliches)
        }
    };

    const texts: { [key: string]: any } = {
        DE: {
            contact: 'Kontakt',
            name: 'Name',
            email: 'E-Mail',
            message: 'Nachricht',
            send: 'Senden',
            successMessage: 'Vielen Dank für deine Nachricht!',
        },
        EN: {
            contact: 'Contact',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send',
            successMessage: 'Thank you for your message!',
        },
    };

    const currentTexts = texts[language];

    const getMailtoLink = () => {
        if (language === 'DE') {
            // German structure
            return `mailto:kvadur.clothing@gmail.com?subject=Nachricht von ${formData.name}&body=Sehr geehrter Herr Kvadur,%0D%0A%0D%0A${encodeURIComponent(
                formData.message
            )}%0D%0A%0D%0AMit freundlichen Grüßen,%0D%0A${encodeURIComponent(
                formData.name
            )}`;
        } else {
            // English structure
            return `mailto:kvadur.clothing@gmail.com?subject=Message from ${formData.name}&body=Hi Mr. Kakvadur,%0D%0A%0D%0A${encodeURIComponent(
                formData.message
            )}%0D%0A%0D%0ABest Regards,%0D%0A${encodeURIComponent(
                formData.name
            )}`;
        }
    };

    return (
        <div>
            <Annoucement />
            <Navbar />
            <div className="contact-container">
                <h1>{currentTexts.contact}</h1>
                {success && <p className="success-message">{currentTexts.successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        {currentTexts.name}:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </label>
                    <label>
                        {currentTexts.email}:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </label>
                    <label>
                        {currentTexts.message}:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                        {errors.message && <span className="error-message">{errors.message}</span>}
                    </label>
                    <a
                        href={getMailtoLink()}
                        onClick={(e) => {
                            if (!formData.name || !formData.email || !formData.message) {
                                e.preventDefault();
                                alert(
                                    language === 'DE'
                                        ? 'Bitte füllen Sie alle Felder aus.'
                                        : 'Please fill out all fields.'
                                );
                            }
                        }}
                    >
                        <button type="button">{currentTexts.send}</button>
                    </a>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Contact;
