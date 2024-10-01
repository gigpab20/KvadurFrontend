import React from 'react';
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";


const Home = () => {
    return (
        <div className="container">
            <Annoucement/>
            <Navbar/>
            <div className="content">
                {/* Hier kommt Ihr Hauptinhalt hin */}
            </div>
            <Footer/>
        </div>
    );
};

export default Home;