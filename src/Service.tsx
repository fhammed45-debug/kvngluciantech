import React from 'react';
import { Link } from "react-router-dom";
import { useResponsive } from "./hooks/useResponsive";

const Services = () => {
  const { isMobile, isTablet } = useResponsive();
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const services = [
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
      <nav style={{
        padding: isMobile ? "15px 20px" : "20px 40px",
      }}>
        <Link to="/Home" style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: isMobile ? "14px" : "16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        }}>
          ← Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '40px 20px' : isTablet ? '50px 30px' : '64px 32px'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: isMobile ? '40px' : '64px'
        }}>
          Our Services
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : isTablet 
            ? 'repeat(auto-fit, minmax(280px, 1fr))' 
            : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? '20px' : '32px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {services.map((service, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'white',
                borderRadius: isMobile ? '12px' : '16px',
                padding: isMobile ? '24px' : '32px',
                boxShadow: hoveredCard === index 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                transform: hoveredCard === index && !isMobile ? 'translateY(-8px)' : 'translateY(0)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                background: '#fee2e2',
                width: isMobile ? '56px' : '64px',
                height: isMobile ? '56px' : '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '16px' : '24px',
                fontSize: isMobile ? '28px' : '32px'
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: isMobile ? '12px' : '16px'
              }}>
                {service.title}
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.75',
                fontSize: isMobile ? '14px' : '16px'
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

export default Services;