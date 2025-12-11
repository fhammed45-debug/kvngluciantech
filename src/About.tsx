import { Link } from "react-router-dom";
import "./AboutResponsive.css";

export default function AboutMe() {
  return (
    <div className="about-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8E2017 0%, #8E2017 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <nav className="about-nav" style={{
        color: "#fff",
        maxWidth: '1200px',
        margin: '0 auto 40px'
      }}>
        <Link to="/home" className="about-back-link" style={{
          color: "#fff",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        }}>
          ← Back to Home
        </Link>
      </nav>

      <div className="about-header" style={{
        maxWidth: '1200px',
        textAlign: 'center'
      }}>
        <h1 className="about-title" style={{
          fontWeight: '700',
          color: '#FFF5F0',
          marginBottom: '20px',
          letterSpacing: '-1px'
        }}>
          About Me
        </h1>
        <p className="about-subtitle" style={{
          color: '#FFE5DC',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Passionate about creating meaningful digital experiences and solving complex problems
        </p>
      </div>

      <div className="about-grid" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
      }}>
        {/* Who I Am Card */}
        <div className="about-card" style={{
          background: '#FFF5F0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 className="about-card-title" style={{
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span className="about-emoji">👋</span>
            Who I Am
          </h2>
          <p className="about-card-text" style={{
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            I'm a dedicated professional with a passion for innovation and excellence. 
            My journey in the tech industry has been driven by curiosity and a constant 
            desire to learn and grow.
          </p>
          <p className="about-card-text" style={{
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            With years of experience under my belt, I've developed a unique perspective 
            that combines technical expertise with creative problem-solving.
          </p>
        </div>

        {/* What I Do Card */}
        <div className="about-card" style={{
          background: '#FFF5F0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 className="about-card-title" style={{
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span className="about-emoji">💼</span>
            What I Do
          </h2>
          <p className="about-card-text" style={{
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            I specialize in crafting elegant solutions to complex challenges, focusing 
            on user-centered design and cutting-edge technology.
          </p>
          <div className="about-skills-grid" style={{
            display: 'grid',
            gap: '12px',
            marginTop: '20px'
          }}>
            <div className="about-skill-tag" style={{
              background: '#8E2017',
              color: '#FFF5F0',
              borderRadius: '10px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Web Development
            </div>
            <div className="about-skill-tag" style={{
              background: '#8E2017',
              color: '#FFF5F0',
              borderRadius: '10px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              HTML & CSS including JavaScript
            </div>
            <div className="about-skill-tag" style={{
              background: '#8E2017',
              color: '#FFF5F0',
              borderRadius: '10px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              React & TypeScript
            </div>
            <div className="about-skill-tag" style={{
              background: '#8E2017',
              color: '#FFF5F0',
              borderRadius: '10px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Problem Solving
            </div>
          </div>
        </div>

        {/* My Approach Card */}
        <div className="about-card" style={{
          background: '#FFF5F0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 className="about-card-title" style={{
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span className="about-emoji">🎯</span>
            My Approach
          </h2>
          <p className="about-card-text" style={{
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            I believe in quality over quantity, attention to detail, and maintaining 
            clear communication throughout every project.
          </p>
          <p className="about-card-text" style={{
            lineHeight: '1.8',
            color: '#4A3428',
            marginBottom: '15px'
          }}>
            My work philosophy centers on collaboration, continuous improvement, and 
            delivering results that exceed expectations.
          </p>
        </div>

        {/* Experience Card */}
        <div className="about-card" style={{
          background: '#FFF5F0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <h2 className="about-card-title" style={{
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span className="about-emoji">📊</span>
            Experience
          </h2>
          <div className="about-stat-box" style={{
            background: 'rgba(139, 46, 46, 0.1)',
            borderRadius: '12px',
            marginTop: '15px',
            border: '2px solid rgba(139, 46, 46, 0.2)'
          }}>
            <div className="about-stat-number" style={{
              fontWeight: '700',
              color: '#8E2017',
              marginBottom: '8px'
            }}>
              4 months
            </div>
            <div className="about-stat-label" style={{
              color: '#4A3428',
              fontWeight: '500'
            }}>
              Years of Experience
            </div>
          </div>
          <div className="about-stat-box" style={{
            background: 'rgba(139, 46, 46, 0.1)',
            borderRadius: '12px',
            marginTop: '15px',
            border: '2px solid rgba(139, 46, 46, 0.2)'
          }}>
            <div className="about-stat-number" style={{
              fontWeight: '700',
              color: '#8E2017',
              marginBottom: '8px'
            }}>
              1+
            </div>
            <div className="about-stat-label" style={{
              color: '#4A3428',
              fontWeight: '500'
            }}>
              Projects Completed
            </div>
          </div>
          <div className="about-stat-box" style={{
            background: 'rgba(139, 46, 46, 0.1)',
            borderRadius: '12px',
            marginTop: '15px',
            border: '2px solid rgba(139, 46, 46, 0.2)'
          }}>
            <div className="about-stat-number" style={{
              fontWeight: '700',
              color: '#8E2017',
              marginBottom: '8px'
            }}>
              75%
            </div>
            <div className="about-stat-label" style={{
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