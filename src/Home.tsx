import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Tech from "./assets/Tech.jpg";
import Africa from "./assets/Africa.png";
import { authAPI, subscriptionAPI } from "./services";
import { useResponsive } from "./hooks/useResponsive";

interface User {
  id: number;
  name: string;
  email: string;
  is_verified: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
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
      <div style={{
        backgroundColor: "#8E2017",
        margin: "0",
        outline: "none",
        border: "none",
        boxSizing: "border-box",
        minHeight: isMobile ? "auto" : "1006px",
      }}>
        <nav style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          backgroundColor: "#8E2017",
          padding: isMobile ? "15px 20px" : isTablet ? "20px 30px" : "20px 40px",
          color: "#fff",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "15px" : "0",
        }}>
          <div style={{
            fontSize: isMobile ? "18px" : "20px",
            fontWeight: "bold",
          }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
              Logo
            </a>
          </div>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "15px" : "30px",
            alignItems: isMobile ? "flex-start" : "center",
            width: isMobile ? "100%" : "auto",
          }}>
            <Link to="/Home" style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: isMobile ? "14px" : "16px",
            }}>
              Home
            </Link>
            <Link to="/About" style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: isMobile ? "14px" : "16px",
            }}>
              About
            </Link>
            <Link to="/Contact" style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: isMobile ? "14px" : "16px",
            }}>
              Contact
            </Link>
            {user ? (
              <>
                <span style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: isMobile ? "14px" : "16px",
                }}>
                  Welcome, {user.name || user.email}!
                </span>
                <button style={{
                  borderRadius: "25px",
                  backgroundColor: "#fff",
                  color: "#8E2017",
                  cursor: "pointer",
                  fontSize: isMobile ? "11px" : "12px",
                  outline: "none",
                  padding: isMobile ? "8px 16px" : "10px 20px",
                  border: "none",
                  width: isMobile ? "100%" : "auto",
                }} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button style={{
                borderRadius: "25px",
                backgroundColor: "#fff",
                color: "#8E2017",
                cursor: "pointer",
                fontSize: isMobile ? "11px" : "12px",
                outline: "none",
                padding: isMobile ? "8px 16px" : "10px 20px",
                border: "none",
                width: isMobile ? "100%" : "auto",
              }} onClick={() => navigate("/Login")}>
                Get Started
              </button>
            )}
          </div>
        </nav>

        <div style={{
          backgroundColor: "#8E2017",
          color: "#fff",
          textAlign: "center",
          padding: isMobile ? "50px 20px" : isTablet ? "80px 40px" : "100px 20px",
        }}>
          <h1 style={{
            fontSize: isMobile ? "48px" : isTablet ? "80px" : "150px",
            fontWeight: "bold",
            lineHeight: "1.1",
            marginBottom: isMobile ? "30px" : "40px",
          }}>
            Learn, <br />
            Build, Scale
          </h1>
          
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "10px",
            backgroundColor: "#fff",
            borderRadius: "30px",
            width: isMobile ? "90%" : isTablet ? "400px" : "500px",
            maxWidth: "95%",
            margin: "0 auto",
            padding: isMobile ? "10px" : "8px",
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
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: isMobile ? "12px 15px" : "12px 20px",
                borderRadius: "25px",
                fontSize: isMobile ? "14px" : "16px",
                width: "100%",
                minWidth: 0,
                backgroundColor: "#fff",
              }}
            />
            <button
              style={{
                backgroundColor: "#8B1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                padding: isMobile ? "12px 20px" : "12px 30px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                opacity: loading ? 0.6 : 1,
                fontSize: isMobile ? "14px" : "16px",
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
            <p style={{
              color: "#ffcccc",
              marginTop: "15px",
              fontSize: isMobile ? "12px" : "14px",
              fontWeight: "bold",
            }}>{subscribeError}</p>
          )}
          {subscribeMessage && (
            <p style={{
              color: "#ccffcc",
              marginTop: "15px",
              fontSize: isMobile ? "12px" : "14px",
              fontWeight: "bold",
            }}>{subscribeMessage}</p>
          )}
        </div>
      </div>

      <section style={{
        backgroundColor: "#fff",
        padding: isMobile ? "40px 20px" : isTablet ? "50px 30px" : "60px 20px",
        textAlign: "center",
        color: "#8E2017",
      }}>
        <h2 style={{
          fontSize: isMobile ? "24px" : isTablet ? "28px" : "30px",
          marginBottom: isMobile ? "30px" : "50px",
          fontWeight: "bold",
        }}>Tech for everyone</h2>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "30px" : "50px",
          flexWrap: "wrap",
        }}>
          <img src={Tech} alt="Tech for everyone" style={{
            width: isMobile ? "100%" : isTablet ? "350px" : "450px",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
          }} />
          <div style={{
            textAlign: "left",
            maxWidth: isMobile ? "100%" : "400px",
          }}>
            <h3 style={{
              fontSize: isMobile ? "20px" : "22px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}>Tech awaits you</h3>
            <p style={{
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: "1.6",
              marginBottom: "25px",
            }}>
              Irrespective of race, age, religion or gender, tech has proven to
              be for everyone, the barrier between you and tech is learning,
              start today, build so you can scale.
            </p>
            <button
              style={{
                backgroundColor: "#8E2017",
                color: "#fff",
                border: "none",
                padding: isMobile ? "10px 20px" : "12px 25px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: isMobile ? "14px" : "16px",
                width: isMobile ? "100%" : "auto",
              }}
              onClick={() => navigate("/signup")}
            >
              Get started
            </button>
          </div>
        </div>
      </section>

      <section style={{
        backgroundColor: "#FFF2F2",
        padding: isMobile ? "40px 20px" : isTablet ? "60px 40px" : "80px 100px",
        color: "#8E2017",
        minHeight: isMobile ? "auto" : "800px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "40px" : "60px",
          flexWrap: "wrap",
        }}>
          <div style={{
            maxWidth: isMobile ? "100%" : "500px",
          }}>
            <h2 style={{
              fontSize: isMobile ? "20px" : isTablet ? "22px" : "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              marginTop: isMobile ? "0" : "50px",
              paddingTop: "10px",
            }}>
              Everything we do in the african {!isMobile && <br />}
              tech space, is revolutionary
            </h2>
            <p style={{
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: "1.6",
              marginTop: isMobile ? "20px" : "40px",
              paddingTop: "10px",
            }}>
              Irrespective of race, age, religion or {!isMobile && <br />}
              gender, tech has proven to be for {!isMobile && <br />}
              everyone, the barrier between you and {!isMobile && <br />}
              tech is learning, start today, build so {!isMobile && <br />}
              you can scale.
            </p>
          </div>
          <img src={Africa} alt="Africa map" style={{
            width: isMobile ? "100%" : isTablet ? "400px" : "553px",
            maxWidth: "100%",
            height: "auto",
            marginTop: isMobile ? "0" : isTablet ? "50px" : "150px",
            paddingTop: isMobile ? "0" : "40px",
            borderRadius: "10px",
          }} />
        </div>
      </section>

      <footer style={{
        backgroundColor: "#8B1E1E",
        color: "#fff",
        padding: isMobile ? "30px 20px 20px" : isTablet ? "40px 50px 20px" : "50px 100px 20px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: isMobile ? "30px" : "40px",
          gap: isMobile ? "30px" : "20px",
        }}>
          <div>
            <h3 style={{
              fontWeight: "bold",
              marginBottom: "10px",
              fontSize: isMobile ? "16px" : "18px",
            }}>We are learning tech</h3>
          </div>
          <div>
            <h3 style={{
              fontWeight: "bold",
              marginBottom: "10px",
              fontSize: isMobile ? "16px" : "18px",
            }}>Services</h3>
            <p style={{
              margin: "5px 0",
              color: "#f2f2f2",
              fontSize: isMobile ? "14px" : "16px",
            }}>Web development</p>
            <p style={{
              margin: "5px 0",
              color: "#f2f2f2",
              fontSize: isMobile ? "14px" : "16px",
            }}>App development</p>
            <p style={{
              margin: "5px 0",
              color: "#f2f2f2",
              fontSize: isMobile ? "14px" : "16px",
            }}>Software development</p>
          </div>
          <div>
            <h3 style={{
              fontWeight: "bold",
              marginBottom: "10px",
              fontSize: isMobile ? "16px" : "18px",
            }}>Contact</h3>
            <p style={{
              margin: "5px 0",
              color: "#f2f2f2",
              fontSize: isMobile ? "14px" : "16px",
            }}>Lagos, Nigeria</p>
            <p style={{
              margin: "5px 0",
              color: "#f2f2f2",
              fontSize: isMobile ? "14px" : "16px",
            }}>+234 70999883</p>
            <p style={{
              margin: "5px 0",
              color: "#f2f2f2",
              fontSize: isMobile ? "14px" : "16px",
            }}>agbest@gmail.com</p>
          </div>
        </div>
        <p style={{
          textAlign: "center",
          fontSize: isMobile ? "12px" : "14px",
          opacity: 0.7,
        }}>Copyright 2024 web dev limited</p>
      </footer>
    </>
  );
};

export default Home;