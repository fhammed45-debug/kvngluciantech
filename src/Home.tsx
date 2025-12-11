import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Tech from "./assets/Tech.jpg";
import Africa from "./assets/Africa.png";
import ChatGPT2 from "./assets/ChatGPT2.png";
import { authAPI, subscriptionAPI } from "./services";
import "./HomeResponsive.css";

interface User {
  id: number;
  name: string;
  email: string;
  is_verified: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
        } catch (error) {
          console.error("User not authenticated", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };
    checkAuth();
  }, []);

  // Handle Subscribe
  const handleSubscribe = async () => {
    if (!email) {
      setSubscribeError("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setSubscribeError("");
    setSubscribeMessage("");

    try {
      await subscriptionAPI.subscribe({
        email: email,
        plan: "basic",
      });

      setSubscribeMessage("Successfully subscribed! Check your email.");
      setEmail("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setSubscribeError("Please login or signup to subscribe");
          setTimeout(() => navigate("/signup"), 2000);
        } else {
          setSubscribeError(
            error.response?.data?.error || 
            error.response?.data?.message || 
            "Subscription failed. Please try again."
          );
        }
      } else {
        setSubscribeError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <>
      <div className="home-hero" style={{
        backgroundColor: "#8E2017",
        margin: "0",
        outline: "none",
        border: "none",
        boxSizing: "border-box",
      }}>
        <nav className="home-nav" style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#8E2017",
          color: "#fff",
        }}>
          <div className="home-logo" style={{
            fontWeight: "bold",
          }}>
            <img src={ChatGPT2} alt="Logo" className="home-logo-img" style={{
              height: "40px",
              width: "40px",
            }} />
          </div>
          <div className="home-nav-links" style={{
            display: "flex",
          }}>
            <Link to="/Service" className="home-nav-link" style={{
              color: "#fff",
              textDecoration: "none",
            }}>
              Services
            </Link>
            <Link to="/About" className="home-nav-link" style={{
              color: "#fff",
              textDecoration: "none",
            }}>
              About
            </Link>
            <Link to="/Contact" className="home-nav-link" style={{
              color: "#fff",
              textDecoration: "none",
            }}>
              Contact
            </Link>
            {user ? (
              <>
                <span className="home-nav-link" style={{
                  color: "#fff",
                  textDecoration: "none",
                }}>
                  Welcome, {user.name || user.email}!
                </span>
                <button className="home-nav-btn" style={{
                  borderRadius: "25px",
                  backgroundColor: "#fff",
                  color: "#8E2017",
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                }} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="home-nav-btn" style={{
                borderRadius: "25px",
                backgroundColor: "#fff",
                color: "#8E2017",
                cursor: "pointer",
                outline: "none",
                border: "none",
              }} onClick={() => navigate("/Login")}>
                Get Started
              </button>
            )}
          </div>
        </nav>

        <div className="home-hero-content" style={{
          backgroundColor: "#8E2017",
          color: "#fff",
          textAlign: "center",
        }}>
          <h1 className="home-hero-title" style={{
            fontWeight: "bold",
            lineHeight: "1.1",
          }}>
            Learn, <br />
            Build, Scale
          </h1>
          
          <div className="home-subscribe-form" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "10px",
            backgroundColor: "#fff",
            borderRadius: "30px",
            
            margin: "0 auto",
          }}>
            <input
  type="email"
  placeholder="Email address"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setSubscribeError("");
    setSubscribeMessage("");
  }}
  className="home-email-input"
  style={{
    flex: 1,
    border: "none",
    outline: "none",
    borderRadius: "25px",
    width: "100%",
    minWidth: 0,
    backgroundColor: "#fff",
    boxSizing: "border-box",  // ✅ ADD THIS LINE
  }}
/>
          
            <button
              className="home-subscribe-btn"
              style={{
                backgroundColor: "#8B1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                opacity: loading ? 0.6 : 1,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {subscribeError && (
            <p className="home-message" style={{
              color: "#ffcccc",
              marginTop: "15px",
              fontWeight: "bold",
            }}>{subscribeError}</p>
          )}
          {subscribeMessage && (
            <p className="home-message" style={{
              color: "#ccffcc",
              marginTop: "15px",
              fontWeight: "bold",
            }}>{subscribeMessage}</p>
          )}
        </div>
      </div>

      <section className="home-tech-section" style={{
        backgroundColor: "#fff",
        textAlign: "center",
        color: "#8E2017",
      }}>
        <h2 className="home-section-title" style={{
          fontWeight: "bold",
        }}>Tech for everyone</h2>
        <div className="home-content-flex" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <img src={Tech} alt="Tech for everyone" className="home-tech-img" style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
          }} />
          <div className="home-text-content" style={{
            textAlign: "left",
          }}>
            <h3 className="home-text-title" style={{
              fontWeight: "bold",
              marginBottom: "15px",
            }}>Tech awaits you</h3>
            <p className="home-text-para" style={{
              lineHeight: "1.6",
              marginBottom: "25px",
            }}>
              Irrespective of race, age, religion or gender, tech has proven to
              be for everyone, the barrier between you and tech is learning,
              start today, build so you can scale.
            </p>
            <button
              className="home-cta-btn"
              style={{
                backgroundColor: "#8E2017",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/signup")}
            >
              Get started
            </button>
          </div>
        </div>
      </section>

      <section className="home-africa-section" style={{
        backgroundColor: "#FFF2F2",
        color: "#8E2017",
      }}>
        <div className="home-africa-flex" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <div className="home-africa-text">
            <h2 className="home-africa-title" style={{
              fontWeight: "bold",
              marginBottom: "20px",
              paddingTop: "10px",
            }}>
              Everything we do in the african <br className="desktop-br" />
              tech space, is revolutionary
            </h2>
            <p className="home-africa-para" style={{
              lineHeight: "1.6",
              paddingTop: "10px",
            }}>
              Irrespective of race, age, religion or <br className="desktop-br" />
              gender, tech has proven to be for <br className="desktop-br" />
              everyone, the barrier between you and <br className="desktop-br" />
              tech is learning, start today, build so <br className="desktop-br" />
              you can scale.
            </p>
          </div>
          <img src={Africa} alt="Africa map" className="home-africa-img" style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
          }} />
        </div>
      </section>

      <footer className="home-footer" style={{
        backgroundColor: "#8B1E1E",
        color: "#fff",
      }}>
        <div className="home-footer-content" style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}>
          <div>
            <h3 className="home-footer-title" style={{
              fontWeight: "bold",
              marginBottom: "10px",
            }}>We are learning tech</h3>
          </div>
          <div>
            <h3 className="home-footer-title" style={{
              fontWeight: "bold",
              marginBottom: "10px",
            }}>Services</h3>
            <p className="home-footer-text" style={{
              margin: "5px 0",
              color: "#f2f2f2",
            }}>Web development</p>
            <p className="home-footer-text" style={{
              margin: "5px 0",
              color: "#f2f2f2",
            }}>App development</p>
            <p className="home-footer-text" style={{
              margin: "5px 0",
              color: "#f2f2f2",
            }}>Software development</p>
          </div>
          <div>
            <h3 className="home-footer-title" style={{
              fontWeight: "bold",
              marginBottom: "10px",
            }}>Contact</h3>
            <p className="home-footer-text" style={{
              margin: "5px 0",
              color: "#f2f2f2",
            }}>Lagos, Nigeria</p>
            <p className="home-footer-text" style={{
              margin: "5px 0",
              color: "#f2f2f2",
            }}>+234 9017802292</p>
            <p className="home-footer-text" style={{
              margin: "5px 0",
              color: "#f2f2f2",
            }}>kvngluciantech@gmail.com</p>
          </div>
        </div>
        <p className="home-footer-copyright" style={{
          textAlign: "center",
          opacity: 0.7,
        }}>Copyright 2024 web dev limited</p>
      </footer>
    </>
  );
};

export default Home;