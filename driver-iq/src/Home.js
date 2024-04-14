import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file
import Navbar from './NavBar';

const Home = () => {
    return (
        <div className="home-page">
            <header>
                <Navbar />
            </header>
            <section className="hero">
                <div className="hero-content">
                    <h2>Making it easy to pass on the first try</h2>
                    <p>DriverIQ offers study flashcards,chapter quizzes and a self practise test to help you prepare for your theory test .</p>
                    <Link to="/PractiseTest" className="btn btn-primary">Take Practise Test</Link>
                </div>
            </section>
            <section className="features">
                <div className="feature">
                    <i className="fas fa-graduation-cap"></i>
                    <h3>Flashcards</h3>
                    <p>Flash cards with revision information in order to strengthen your knowledge</p>
                </div>
                <div className="feature">
                    <i className="fas fa-chart-line"></i>
                    <h3>Performance Analytics</h3>
                    <p>Track your study progress analyzing your strengths and your weaknesses.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-map-marked-alt"></i>
                    <h3>A Timed Simulation</h3>
                    <p>A timed simulation that accurately reflects the circumstances of the real theoretical test for a driver’s licence</p>
                </div>
            </section>
            
        </div>
    );
};

export default Home;
