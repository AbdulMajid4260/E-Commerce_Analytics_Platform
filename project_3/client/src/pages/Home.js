import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import howItWorks from '../assets/how-it-works.svg';
import bhargaviImg from '../assets/bhargavi.png';
import eeswarImg from '../assets/eeswar.png';
import abdulImg from '../assets/abdul.png';
import nagarajuImg from '../assets/nagaraju.png';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar glass-nav">
        <div className="nav-container">
          <div className="brand">
            <div className="brand-logo">EA</div>
            <h1 className="logo">E-Commerce Analytics Platform</h1>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      <main className="home-main">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to E-Commerce Analytics Platform</h1>
            <p className="hero-subtitle">
              Turn raw e‑commerce data into clear, actionable insights with automated ETL,
              interactive dashboards, and powerful analytics designed for product, marketing,
              and operations teams.
            </p>
            <p className="hero-description">
              Connect your sales exports, upload CSV or Excel reports, and instantly explore trends,
              customer behavior, top-performing products, and revenue patterns — all in one place,
              backed by a secure SQL data engine.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h1 className="features-main-title">Everything You Need for <span className="highlight">Data-Driven Decisions</span></h1>
            <p className="features-subtitle">Powerful features designed specifically for e-commerce business owners who want insights without the complexity of traditional BI tools.</p>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-badge">⬆️</div>
                <div className="feature-content">
                  <h3>Easy Data Upload</h3>
                  <p>Simply upload your CSV or JSON sales data files. Our system handles the rest automatically.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">✨</div>
                <div className="feature-content">
                  <h3>Automated ETL Pipeline</h3>
                  <p>Smart data cleaning with null handling, type standardization, duplicate removal, and outlier detection.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">📊</div>
                <div className="feature-content">
                  <h3>Rich Visualizations</h3>
                  <p>Beautiful bar charts, pie charts, and tabular summaries generated from your actual data.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">🔽</div>
                <div className="feature-content">
                  <h3>Smart Filtering</h3>
                  <p>Filter insights by product, region, or time period for targeted analysis.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">🧠</div>
                <div className="feature-content">
                  <h3>AI-Powered Insights</h3>
                  <p>Our AI explains trends in plain language, just like a data analyst would.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">🛡️</div>
                <div className="feature-content">
                  <h3>Secure & Private</h3>
                  <p>Your business data is encrypted and protected. We never share or sell your information.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">⚡</div>
                <div className="feature-content">
                  <h3>Real-Time Analysis</h3>
                  <p>Get instant insights as soon as you upload your data. No waiting, no delays.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-badge">🌐</div>
                <div className="feature-content">
                  <h3>Cloud Deployed</h3>
                  <p>Access your analytics dashboard from anywhere, anytime on AWS cloud infrastructure.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="container">
            <div className="features-title-wrapper">
              <h2 className="section-title">How It Works</h2>
            </div>
            <p className="how-sub">From data upload to actionable insights in four simple steps. No technical expertise required.</p>

            <div className="how-steps">
              <div className="step">
                <div className="circle">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                    <path d="M12 3v10" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 7l4-4 4 4" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="13" width="18" height="6" rx="2" stroke="#021" strokeWidth="1.5"/>
                  </svg>
                  <div className="badge">01</div>
                </div>
                <h3>Upload Your Data</h3>
                <p>Simply drag and drop your CSV or JSON sales data file into our platform.</p>
              </div>

              <div className="step">
                <div className="circle">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                    <path d="M12 8v4" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.24 7.76l-1.41 1.41" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.76 7.76L9.17 9.17" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="5" stroke="#021" strokeWidth="1.5"/>
                  </svg>
                  <div className="badge">02</div>
                </div>
                <h3>Automatic Processing</h3>
                <p>Our ETL pipeline cleans, validates, and transforms your data automatically.</p>
              </div>

              <div className="step">
                <div className="circle">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                    <path d="M4 20h16" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 14v6" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 10v10" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 6v14" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="badge">03</div>
                </div>
                <h3>View Visualizations</h3>
                <p>Explore interactive charts, graphs, and tables generated from your data.</p>
              </div>

              <div className="step">
                <div className="circle">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                    <path d="M9 18h6" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2a6 6 0 00-4 10c0 2 1 3 2 4h4c1-1 2-2 2-4a6 6 0 00-4-10z" stroke="#021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="badge">04</div>
                </div>
                <h3>Get AI Insights</h3>
                <p>Receive plain-language explanations of trends and actionable recommendations.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="team-section">
        <div className="container">
          <div className="features-title-wrapper">
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-img-wrapper">
                <img src={bhargaviImg} alt="Bhargavi" className="team-img" />
              </div>
              <h3 className="team-name">Bhargavi</h3>
              <p className="team-role">Software Engineer</p>
            </div>
            <div className="team-card">
              <div className="team-img-wrapper">
                <img src={eeswarImg} alt="Eeswar" className="team-img" />
              </div>
              <h3 className="team-name">Eeswar</h3>
              <p className="team-role">Software Engineer</p>
            </div>
            <div className="team-card">
              <div className="team-img-wrapper">
                <img src={abdulImg} alt="Abdul" className="team-img" />
              </div>
              <h3 className="team-name">Abdul</h3>
              <p className="team-role">Software Engineer</p>
            </div>
            <div className="team-card">
              <div className="team-img-wrapper">
                <img src={nagarajuImg} alt="Nagaraju" className="team-img" />
              </div>
              <h3 className="team-name">Nagaraju</h3>
              <p className="team-role">Software Engineer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Transform Your <span className="highlight">Business Analytics?</span></h2>
          <p className="cta-sub">Join hundreds of e-commerce owners who have already discovered the power of AI-driven insights. Start your journey today.</p>

          <div className="cta-features">
            <div className="cta-pill"><span className="check">✔</span> No credit card required</div>
            <div className="cta-pill"><span className="check">✔</span> Free data analysis up to 1000 rows</div>
            <div className="cta-pill"><span className="check">✔</span> AI-powered insights included</div>
            <div className="cta-pill"><span className="check">✔</span> Export reports in multiple formats</div>
          </div>

          <div className="cta-actions">
            <Link to="/register" className="btn btn-cta">Get Started for Free →</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 BEAN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

