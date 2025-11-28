import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import { useResponsive } from "./hooks/useResponsive";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
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
      <div style={{
        color: "#fff",
        padding: isMobile ? "15px 20px" : "20px 40px",
        fontSize: isMobile ? "14px" : "16px",
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

      <div style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: isMobile ? "20px 15px" : isTablet ? "30px 20px" : "20px",
      }}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: isMobile ? "10px" : "15px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "700px" : "950px",
          padding: isMobile ? "30px 20px" : isTablet ? "40px 30px" : "50px",
          boxSizing: "border-box",
          gap: isMobile ? "30px" : "40px",
        }}>
          {/* Left Section */}
          <div style={{
            flex: isMobile ? "none" : "1 1 45%",
            display: "flex",
            alignItems: "center",
            minWidth: isMobile ? "100%" : "300px",
          }}>
            <h1 style={{
              fontSize: isMobile ? "1.3rem" : isTablet ? "1.5rem" : "1.8rem",
              fontWeight: 700,
              color: "#000",
              lineHeight: "1.4",
              margin: 0,
            }}>
              Welcome back to the city of knowledge
            </h1>
          </div>

          {/* Right Section - Form */}
          <div style={{
            flex: isMobile ? "none" : "1 1 40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: isMobile ? "100%" : "300px",
          }}>
            <h2 style={{
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              fontWeight: 700,
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}>Login</h2>

            {/* Error Message */}
            {error && (
              <div style={{
                backgroundColor: "#ffebee",
                color: "#c62828",
                padding: isMobile ? "10px" : "12px",
                borderRadius: "6px",
                marginBottom: "15px",
                fontSize: isMobile ? "13px" : "14px",
                textAlign: "center",
                border: "1px solid #ef9a9a",
              }}>
                {error}
                {needsVerification && (
                  <button
                    onClick={handleResendVerification}
                    style={{
                      backgroundColor: "#8E2017",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: isMobile ? "6px 12px" : "8px 16px",
                      marginTop: "10px",
                      cursor: "pointer",
                      fontSize: isMobile ? "12px" : "13px",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Resend Verification Code
                  </button>
                )}
              </div>
            )}

            <form 
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "12px" : "15px",
              }}
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  padding: isMobile ? "10px 12px" : "12px 15px",
                  border: "1px solid #999",
                  borderRadius: "6px",
                  fontSize: isMobile ? "14px" : "15px",
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
                style={{
                  padding: isMobile ? "10px 12px" : "12px 15px",
                  border: "1px solid #999",
                  borderRadius: "6px",
                  fontSize: isMobile ? "14px" : "15px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#8E2017",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: isMobile ? "10px" : "12px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: isMobile ? "14px" : "15px",
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

            <p style={{
              fontSize: isMobile ? "13px" : "14px",
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
            <p style={{
              fontSize: isMobile ? "13px" : "14px",
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