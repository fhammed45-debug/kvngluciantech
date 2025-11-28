import { Link } from "react-router-dom";
import { useResponsive } from "./hooks/useResponsive";

export default function AboutMe() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8E2017 0%, #8E2017 100%)',
      padding: isMobile ? '40px 15px' : isTablet ? '60px 30px' : '80px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <nav style={{
        color: "#fff",
        padding: isMobile ? "10px 0 20px" : "20px 0",
        maxWidth: '1200px',
        margin: '0 auto 40px'
      }}>
        <Link to="/home" style={{
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

      <div style={{
        maxWidth: '1200px',
        margin: isMobile ? '0 auto 40px' : '0 auto 60px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
          fontWeight: '700',
          color: '#FFF5F0',
          marginBottom: '20px',
          letterSpacing: '-1px'
        }}>
          About Me
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: '#FFE5DC',
          maxWidth: '600px',
          margin: '0 auto',
          padding: isMobile ? '0 10px' : '0'
        }}>
          Passionate about creating meaningful digital experiences and solving complex problems
        </p>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: isMobile ? '20px' : '30px'
      }}>
        {/* Who I Am Card */}
        <div style={{
          background: '#FFF5F0',
          borderRadius: isMobile ? '15px' : '20px',
          padding: isMobile ? '25px' : isTablet ? '30px' : '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>👋</span>
            Who I Am
          </h2>
          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            I'm a dedicated professional with a passion for innovation and excellence. 
            My journey in the tech industry has been driven by curiosity and a constant 
            desire to learn and grow.
          </p>
          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            With years of experience under my belt, I've developed a unique perspective 
            that combines technical expertise with creative problem-solving.
          </p>
        </div>

        {/* What I Do Card */}
        <div style={{
          background: '#FFF5F0',
          borderRadius: isMobile ? '15px' : '20px',
          padding: isMobile ? '25px' : isTablet ? '30px' : '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>💼</span>
            What I Do
          </h2>
          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            I specialize in crafting elegant solutions to complex challenges, focusing 
            on user-centered design and cutting-edge technology.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '12px',
            marginTop: '20px'
          }}>
            <div style={{
              background: '#8E2017',
              color: '#FFF5F0',
              padding: isMobile ? '8px 12px' : '10px 16px',
              borderRadius: '10px',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Web Development
            </div>
            <div style={{
              background: '#8E2017',
              color: '#FFF5F0',
              padding: isMobile ? '8px 12px' : '10px 16px',
              borderRadius: '10px',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              HTML & CSS including JavaScript
            </div>
            <div style={{
              background: '#8E2017',
              color: '#FFF5F0',
              padding: isMobile ? '8px 12px' : '10px 16px',
              borderRadius: '10px',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              React & TypeScript
            </div>
            <div style={{
              background: '#8E2017',
              color: '#FFF5F0',
              padding: isMobile ? '8px 12px' : '10px 16px',
              borderRadius: '10px',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Problem Solving
            </div>
          </div>
        </div>

        {/* My Approach Card */}
        <div style={{
          background: '#FFF5F0',
          borderRadius: isMobile ? '15px' : '20px',
          padding: isMobile ? '25px' : isTablet ? '30px' : '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>🎯</span>
            My Approach
          </h2>
          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            I believe in quality over quantity, attention to detail, and maintaining 
            clear communication throughout every project.
          </p>
          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            My work philosophy centers on collaboration, continuous improvement, and 
            delivering results that exceed expectations.
          </p>
        </div>

        {/* Experience Card */}
        <div style={{
          background: '#FFF5F0',
          borderRadius: isMobile ? '15px' : '20px',
          padding: isMobile ? '25px' : isTablet ? '30px' : '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>📊</span>
            Experience
          </h2>
          <div style={{
            background: 'rgba(139, 46, 46, 0.1)',
            padding: isMobile ? '15px' : '20px',
            borderRadius: '12px',
            marginTop: '15px',
            border: '2px solid rgba(139, 46, 46, 0.2)'
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '700',
              color: '#8E2017',
              marginBottom: '8px'
            }}>
              4 months
            </div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#4A3428',
              fontWeight: '500'
            }}>
              Years of Experience
            </div>
          </div>
          <div style={{
            background: 'rgba(139, 46, 46, 0.1)',
            padding: isMobile ? '15px' : '20px',
            borderRadius: '12px',
            marginTop: '15px',
            border: '2px solid rgba(139, 46, 46, 0.2)'
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '700',
              color: '#8E2017',
              marginBottom: '8px'
            }}>
              1+
            </div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#4A3428',
              fontWeight: '500'
            }}>
              Projects Completed
            </div>
          </div>
          <div style={{
            background: 'rgba(139, 46, 46, 0.1)',
            padding: isMobile ? '15px' : '20px',
            borderRadius: '12px',
            marginTop: '15px',
            border: '2px solid rgba(139, 46, 46, 0.2)'
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '700',
              color: '#8E2017',
              marginBottom: '8px'
            }}>
              75%
            </div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#4A3428',
              fontWeight: '500'
            }}>
              Teacher Satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}