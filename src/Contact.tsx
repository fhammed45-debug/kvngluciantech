import { Link } from "react-router-dom";
import Mail from "./assets/Mail.png";
import Group from "./assets/Group.png";
import Vector from "./assets/Vector.png";
import "./ContactResponsive.css";

function Contact() {
  return (
    <div style={{
      backgroundColor: "#8E2017",
      margin: 0,
      padding: 0,
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
    }}>
      <nav className="contact-nav" style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#8E2017",
        alignItems: "center",
      }}>
        <Link to="/Home" className="contact-back-link" style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
        }}>
            ← Back to Home
        </Link>
        <div className="contact-nav-links" style={{
          display: "flex",
        }}>
          <Link to="/" style={{
            color: "white",
            textDecoration: "none",
          }}>
            
          </Link>
          <Link to="/" style={{
            color: "white",
            textDecoration: "none",
          }}>
            
          </Link>
          <Link to="/Service" className="contact-service-link" style={{
            color: "white",
            textDecoration: "none",
          }}>
            Services
          </Link>
        </div>
      </nav>

      <div className="contact-cards-container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}>
        {/* Contact Info Card */}
        <div className="contact-card" style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
        }}>
          <h2 className="contact-card-title" style={{
            marginTop: "0",
            color: "#000",
          }}>
            Contact us
          </h2>

          <div className="contact-info-item" style={{
            background: "#f4f4f4",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <img
              src={Mail}
              alt="mail box"
              className="contact-icon"
              style={{
                height: "auto",
              }}
            />
            <span style={{ wordBreak: "break-word" }}>
              fhammed45@gmail.com
            </span>
          </div>

          <div className="contact-info-item" style={{
            background: "#f4f4f4",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <img
              src={Group}
              alt="phone box"
              className="contact-icon"
              style={{
                height: "auto",
              }}
            />
            +234 901 780 2292
          </div>

          <div className="contact-info-item" style={{
            background: "#f4f4f4",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <img
              src={Vector}
              alt="location box"
              className="contact-icon"
              style={{
                height: "auto",
              }}
            />
            42 omichel remi etiosa lagos
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-card" style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
        }}>
          <input
            type="text"
            placeholder="Your name"
            className="contact-input"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Your email"
            className="contact-input"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <textarea
            placeholder="Your message"
            className="contact-textarea"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button className="contact-submit-btn" style={{
            width: "100%",
            border: "none",
            backgroundColor: "#8E2017",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;