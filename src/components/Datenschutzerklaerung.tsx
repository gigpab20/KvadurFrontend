import React, { useContext, useState } from 'react';
import Annoucement from "./Annoucement";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LanguageContext } from './LanguageContext';

const Datenschutzerklaerung = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useContext(LanguageContext);

    const texts: { [key: string]: any } = {
        DE: {
            title: 'Datenschutzerklärung',
            intro: 'In dieser Datenschutzerklärung wird beschrieben, wie Ihre personenbezogenen Daten erfasst, verwendet und weitergegeben werden, wenn Sie die Website Kvadur.com (die "Website") nutzen oder dort etwas kaufen.',
            deviceInfoTitle: '1. Von uns erfasste personenbezogene Daten',
            deviceInfo: 'Wenn Sie die Website besuchen, erfassen wir automatisch bestimmte Informationen über Ihr Gerät, darunter Informationen zum Webbrowser, der IP-Adresse, der Zeitzone und einige der Cookies, die auf Ihrem Gerät installiert sind. Zudem erfassen wir Informationen zu den einzelnen Webseiten oder Produkten, die Sie aufrufen, zu den Websites oder Suchbegriffen, die Sie auf die Website geführt haben, sowie Informationen darüber, wie Sie mit der Website interagieren.',
            technologies: 'Wir verwenden die folgenden Technologien zur Erfassung von Geräteinformationen:',
            techList: [
                'Cookies: Datendateien, die auf Ihrem Gerät oder Computer gespeichert werden und häufig eine anonyme eindeutige Kennung enthalten.',
                'Protokolldateien: Protokollieren Aktionen auf der Website und erfassen Daten wie IP-Adresse, Browsertyp, Internetdienstanbieter, verweisende/Ausstiegsseiten sowie Datums-/Uhrzeitstempel.',
                'Web Beacons, Tags und Pixel: Elektronische Dateien zur Erfassung von Informationen darüber, wie Sie auf der Website navigieren.'
            ],
            orderInfoTitle: 'Bestellinformationen',
            orderInfo: 'Wenn Sie auf der Website etwas kaufen oder versuchen, etwas zu kaufen, erfassen wir bestimmte Informationen über Sie, wie Name, Rechnungsadresse, Lieferadresse, Zahlungsinformationen (einschließlich Kreditkartennummern), E-Mail-Adresse und Telefonnummer.',
            dataUsageTitle: '2. Wie verwenden wir Ihre personenbezogenen Daten?',
            dataUsage: 'Wir verwenden die erfassten Bestellinformationen, um Bestellungen auszuführen, die über die Website getätigt wurden, einschließlich der Verarbeitung von Zahlungsinformationen, der Versandabwicklung und der Bereitstellung von Rechnungen oder Bestellbestätigungen.',
            thirdPartySharingTitle: '3. Weitergabe Ihrer personenbezogenen Daten',
            thirdPartySharing: 'Wir geben Ihre personenbezogenen Daten an Dritte weiter, die uns unterstützen, wie z.B. Shopify für den Betrieb unseres Shops und Google Analytics für die Analyse der Websitenutzung.',
            analyticsLink: 'Weitere Informationen zu Google Analytics finden Sie hier: https://policies.google.com/privacy?hl=de',
            disputeTitle: '4. Verhaltensbasierte Werbung',
            disputeInfo: 'Wir verwenden Ihre personenbezogenen Daten, um Ihnen zielgerichtete Werbung bereitzustellen. Weitere Informationen finden Sie auf der NAI-Seite: http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work',
            rightsTitle: '5. Ihre Rechte',
            rightsInfo: 'Wenn Sie in Europa ansässig sind, haben Sie das Recht, auf die personenbezogenen Daten zuzugreifen, die wir über Sie haben, und deren Berichtigung oder Löschung zu verlangen.',
            retentionTitle: '6. Datenaufbewahrung',
            retentionInfo: 'Wir bewahren Ihre Bestellinformationen auf, bis Sie uns auffordern, diese zu löschen.',
            changesTitle: '7. Änderungen',
            changesInfo: 'Wir können diese Datenschutzerklärung von Zeit zu Zeit ändern, um betriebliche oder gesetzliche Anforderungen zu erfüllen.',
            contactTitle: '8. Kontakt',
            contactInfo: 'Wenn Sie Fragen haben, können Sie uns unter brujob20@htl-kaindorf.at kontaktieren.'
        },
        EN: {
            title: 'Privacy Policy',
            intro: 'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Kvadur.com (the "Site").',
            deviceInfoTitle: '1. Personal Information We Collect',
            deviceInfo: 'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.',
            technologies: 'We collect Device Information using the following technologies:',
            techList: [
                'Cookies: Data files that are placed on your device or computer and often include an anonymous unique identifier.',
                'Log Files: Track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.',
                'Web beacons, tags, and pixels: Electronic files used to record information about how you browse the Site.'
            ],
            orderInfoTitle: 'Order Information',
            orderInfo: 'When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.',
            dataUsageTitle: '2. How Do We Use Your Personal Information?',
            dataUsage: 'We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).',
            thirdPartySharingTitle: '3. Sharing Your Personal Information',
            thirdPartySharing: 'We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store and Google Analytics to understand how our customers use the Site.',
            analyticsLink: 'You can read more about how Google uses your Personal Information here: https://policies.google.com/privacy?hl=en',
            disputeTitle: '4. Behavioural Advertising',
            disputeInfo: 'We use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information, visit the NAI educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work',
            rightsTitle: '5. Your Rights',
            rightsInfo: 'If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.',
            retentionTitle: '6. Data Retention',
            retentionInfo: 'When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.',
            changesTitle: '7. Changes',
            changesInfo: 'We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.',
            contactTitle: '8. Contact Us',
            contactInfo: 'For more information about our privacy practices, or if you have questions, please contact us at brujob20@htl-kaindorf.at.'
        }
    };

    const currentTexts = texts[language];

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", textAlign:"center"}}>
            <Annoucement />
            <Navbar onSearch={setSearchTerm} />
            <h1>{currentTexts.title}</h1>
            <p>{currentTexts.intro}</p>

            <h2>{currentTexts.deviceInfoTitle}</h2>
            <p>{currentTexts.deviceInfo}</p>
            <h3>{currentTexts.technologies}</h3>
            <ul>
                {currentTexts.techList.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h2>{currentTexts.orderInfoTitle}</h2>
            <p>{currentTexts.orderInfo}</p>

            <h2>{currentTexts.dataUsageTitle}</h2>
            <p>{currentTexts.dataUsage}</p>

            <h2>{currentTexts.thirdPartySharingTitle}</h2>
            <p>{currentTexts.thirdPartySharing}</p>
            <p>{currentTexts.analyticsLink}</p>

            <h2>{currentTexts.disputeTitle}</h2>
            <p>{currentTexts.disputeInfo}</p>

            <h2>{currentTexts.rightsTitle}</h2>
            <p>{currentTexts.rightsInfo}</p>

            <h2>{currentTexts.retentionTitle}</h2>
            <p>{currentTexts.retentionInfo}</p>

            <h2>{currentTexts.changesTitle}</h2>
            <p>{currentTexts.changesInfo}</p>

            <h2>{currentTexts.contactTitle}</h2>
            <p>{currentTexts.contactInfo}</p>

            <Footer />
        </div>
    );
};
export default Datenschutzerklaerung;