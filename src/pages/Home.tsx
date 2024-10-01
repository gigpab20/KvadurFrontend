import React from 'react';
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Startpage from "../components/Startpage";


const Home = () => {
    return (
        <div className="container">
            <Annoucement/>
            <Navbar/>
            <div className="content">
                <Startpage/>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;