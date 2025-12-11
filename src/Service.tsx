import React from 'react';
import { Link } from "react-router-dom";
import "./ServicesResponsive.css";

const Service = () => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const service = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Custom website development using modern technologies like React, Next.js, and Node.js to create fast, responsive, and scalable web applications."
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and Swift to reach your audience anywhere."
    },
    {
      icon: "🛒",
      title: "E-Commerce Solutions",
      description: "Full-featured online stores with secure payment integration, inventory management, and seamless shopping experiences for your customers."
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces with exceptional user experience design that engages your audience and drives conversions."
    },
    {
      icon: "⚙️",
      title: "API Development",
      description: "Robust and scalable RESTful and GraphQL APIs to power your applications with secure backend infrastructure and database design."
    },
    {
      icon: "🔧",
      title: "Maintenance & Support",
      description: "Ongoing technical support, bug fixes, updates, and performance optimization to keep your applications running smoothly 24/7."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #8E2017, #8E2017, #8E2017)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <nav className="services-nav">
        <Link to="/Home" style={{
          color: "#fff",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        }} className="services-back-link">
          ← Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <main className="services-main">
        <h1 className="services-title" style={{
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          Our Services
        </h1>
        
        <div className="services-grid">
          {service.map((service, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="services-card"
              style={{
                background: 'white',
                boxShadow: hoveredCard === index 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              data-hovered={hoveredCard === index}
            >
              <div className="services-icon" style={{
                background: '#fee2e2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {service.icon}
              </div>
              <h3 className="services-card-title" style={{
                fontWeight: 'bold',
                color: '#1f2937',
              }}>
                {service.title}
              </h3>
              <p className="services-card-description" style={{
                color: '#4b5563',
                lineHeight: '1.75',
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Service;