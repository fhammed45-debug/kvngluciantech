import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import "./LoginResponsive.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setNeedsVerification(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNeedsVerification(false);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      if (data.success) {
        // Save token and user data to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success message
        alert(`Welcome back, ${data.user.name || data.user.email}!`);

        // Redirect to home page
        navigate("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        
        // Check if email needs verification
        if (error.response?.status === 403 && errorData?.needsVerification) {
          setNeedsVerification(true);
          setError("Please verify your email before logging in.");
        } else {
          setError(
            errorData?.error || 
            "Login failed. Please check your credentials and try again."
          );
        }
      } else {
        setError("Failed to connect to server. Please try again later.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await authAPI.resendVerification(formData.email);
      alert("Verification code sent! Please check your email.");
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to resend verification code");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      backgroundColor: "#8E2017",
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
      overflowX: "hidden",
    }}>
      <div className="login-nav" style={{
        color: "#fff",
      }}>
        <Link to="/home" style={{ 
          color: "#fff", 
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}>
          ← Back to Home
        </Link>
      </div>

      <div className="login-outer-container" style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div className="login-card" style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}>
          {/* Left Section */}
          <div className="login-left-section" style={{
            display: "flex",
            alignItems: "center",
          }}>
            <h1 className="login-heading" style={{
              fontWeight: 700,
              color: "#000",
              lineHeight: "1.4",
              margin: 0,
            }}>
              Welcome back to the city of knowledge
            </h1>
          </div>

          {/* Right Section - Form */}
          <div className="login-right-section" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <h2 className="login-form-title" style={{
              fontWeight: 700,
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}>Login</h2>

            {/* Error Message */}
            {error && (
              <div className="login-error" style={{
                backgroundColor: "#ffebee",
                color: "#c62828",
                borderRadius: "6px",
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ef9a9a",
              }}>
                {error}
                {needsVerification && (
                  <button
                    onClick={handleResendVerification}
                    className="login-resend-btn"
                    style={{
                      backgroundColor: "#8E2017",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Resend Verification Code
                  </button>
                )}
              </div>
            )}

            <form 
              className="login-form"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="login-input"
                style={{
                  border: "1px solid #999",
                  borderRadius: "6px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                style={{
                  border: "1px solid #999",
                  borderRadius: "6px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />
              <button
                type="submit"
                className="login-button"
                style={{
                  backgroundColor: "#8E2017",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: "5px",
                  fontWeight: "600",
                  opacity: loading ? 0.6 : 1,
                  width: "100%",
                  boxSizing: "border-box",
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="login-signup-link" style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#000",
            }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{
                color: "#8E2017",
                textDecoration: "underline",
                marginLeft: "5px",
                fontWeight: "600",
              }}>
                signup
              </Link>
            </p>
            <p className="login-forgot-link" style={{
              textAlign: "center",
              marginTop: "10px",
              color: "#000",
            }}>
              <Link to="/ForgotPassword" style={{
                color: "#8E2017",
                textDecoration: "underline",
                fontWeight: "600",
              }}>
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;