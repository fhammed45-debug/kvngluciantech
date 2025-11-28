import { Link } from "react-router-dom";
import Mail from "./assets/Mail.png";
import Group from "./assets/Group.png";
import Vector from "./assets/Vector.png";
import { useResponsive } from "./hooks/useResponsive";

function Contact() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div style={{
      backgroundColor: "#8E2017",
      margin: 0,
      padding: 0,
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
    }}>
      <nav style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        backgroundColor: "#8E2017",
        alignItems: isMobile ? "flex-start" : "center",
        padding: isMobile ? "15px 20px" : "15px 30px",
        gap: isMobile ? "15px" : "0",
      }}>
        <Link to="/Home" style={{
          color: "white",
          textDecoration: "none",
          fontSize: isMobile ? "18px" : "20px",
          fontWeight: "bold",
        }}>
            ← Back to Home
        </Link>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "15px" : "30px",
          width: isMobile ? "100%" : "auto",
        }}>
          <Link to="/" style={{
            color: "white",
            textDecoration: "none",
            fontSize: isMobile ? "14px" : "16px",
          }}>
            
          </Link>
          <Link to="/" style={{
            color: "white",
            textDecoration: "none",
            fontSize: isMobile ? "14px" : "16px",
          }}>
            
          </Link>
          <Link to="/Service" style={{
            color: "white",
            textDecoration: "none",
            fontSize: isMobile ? "15px" : "17px" ,
          }}>
            Services
          </Link>
        </div>
      </nav>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: isMobile ? "center" : "flex-start",
        gap: isMobile ? "30px" : "20px",
        padding: isMobile ? "30px 20px" : isTablet ? "40px 30px" : "50px",
        flexWrap: "wrap",
      }}>
        {/* Contact Info Card */}
        <div style={{
          backgroundColor: "white",
          padding: isMobile ? "20px" : "25px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          width: isMobile ? "100%" : isTablet ? "280px" : "300px",
          maxWidth: isMobile ? "400px" : "none",
          minHeight: isMobile ? "auto" : "400px",
          boxSizing: "border-box",
        }}>
          <h2 style={{
            marginTop: "0",
            fontSize: isMobile ? "1.3rem" : "1.5rem",
            color: "#000",
          }}>
            Contact us
          </h2>

          <div style={{
            background: "#f4f4f4",
            padding: isMobile ? "12px" : "15px",
            marginBottom: "15px",
            borderRadius: "5px",
            fontSize: isMobile ? "13px" : "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: isMobile ? "8px 0" : "11px 0",
          }}>
            <img
              src={Mail}
              alt="mail box"
              style={{
                width: isMobile ? "18px" : "20px",
                height: "auto",
              }}
            />
            <span style={{ wordBreak: "break-word" }}>
              fhammed45@gmail.com
            </span>
          </div>

          <div style={{
            background: "#f4f4f4",
            padding: isMobile ? "12px" : "15px",
            marginBottom: "15px",
            borderRadius: "5px",
            fontSize: isMobile ? "13px" : "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: isMobile ? "8px 0" : "11px 0",
          }}>
            <img
              src={Group}
              alt="phone box"
              style={{
                width: isMobile ? "18px" : "20px",
                height: "auto",
              }}
            />
            +234 901 780 2292
          </div>

          <div style={{
            background: "#f4f4f4",
            padding: isMobile ? "12px" : "15px",
            marginBottom: "15px",
            borderRadius: "5px",
            fontSize: isMobile ? "13px" : "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: isMobile ? "8px 0" : "11px 0",
          }}>
            <img
              src={Vector}
              alt="location box"
              style={{
                width: isMobile ? "18px" : "20px",
                height: "auto",
              }}
            />
            42 omichel remi etiosa lagos
          </div>
        </div>

        {/* Contact Form Card */}
        <div style={{
          backgroundColor: "white",
          padding: isMobile ? "20px" : "25px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          width: isMobile ? "100%" : isTablet ? "280px" : "300px",
          maxWidth: isMobile ? "400px" : "none",
          minHeight: isMobile ? "auto" : "400px",
          boxSizing: "border-box",
        }}>
          <input
            type="text"
            placeholder="Your name"
            style={{
              width: "100%",
              padding: isMobile ? "8px 10px" : "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: isMobile ? "13px" : "14px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Your email"
            style={{
              width: "100%",
              padding: isMobile ? "8px 10px" : "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: isMobile ? "13px" : "14px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <textarea
            placeholder="Your message"
            rows={isMobile ? 5 : 6}
            style={{
              width: "100%",
              padding: isMobile ? "8px 10px" : "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: isMobile ? "13px" : "14px",
              boxSizing: "border-box",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button style={{
            width: "100%",
            padding: isMobile ? "10px" : "12px",
            border: "none",
            backgroundColor: "#8E2017",
            color: "white",
            fontSize: isMobile ? "14px" : "16px",
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