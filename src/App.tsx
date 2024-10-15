import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from "./components/Catalogue";
import Contact from "./components/Contact"; // Importiere die Kontakt-Komponente

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/contact" element={<Contact />} /> {/* Füge die Kontakt-Route hinzu */}
            </Routes>
        </Router>
    );
}

export default App;
