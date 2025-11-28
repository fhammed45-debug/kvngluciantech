import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import { useResponsive } from "./hooks/useResponsive";

const ForgotPassword: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.forgotPassword(email);

      if (response.data.success) {
        setSuccess(
          "Password reset link sent! Please check your email inbox (and spam folder) for instructions."
        );
        setEmail("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Backend returns generic message for security
        setSuccess(
          "If an account with that email exists, a password reset link has been sent."
        );
        setEmail("");
      } else {
        setError("Failed to connect to server. Please try again later.");
      }
      console.error("Forgot password error:", error);
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
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: isMobile ? "100%" : "300px",
          }}>
            <h1 style={{
              fontSize: isMobile ? "1.3rem" : isTablet ? "1.5rem" : "1.8rem",
              fontWeight: 700,
              color: "#000",
              lineHeight: "1.4",
              marginBottom: "10px",
              margin: "0 0 10px 0",
            }}>
              Reset your password
            </h1>
            <p style={{
              fontSize: isMobile ? "0.9rem" : "1rem",
              color: "#666",
              lineHeight: "1.5",
              margin: 0,
            }}>
              Enter your email and we'll send you a link to reset your password
            </p>
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
            }}>
              Forgot Password
            </h2>

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
              </div>
            )}

            {success && (
              <div style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                padding: isMobile ? "10px" : "12px",
                borderRadius: "6px",
                marginBottom: "15px",
                fontSize: isMobile ? "13px" : "14px",
                textAlign: "center",
                border: "1px solid #a5d6a7",
              }}>
                {success}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div style={{
              marginTop: "20px",
            }}>
              <p style={{
                fontSize: isMobile ? "13px" : "14px",
                textAlign: "center",
                marginTop: "10px",
                color: "#000",
              }}>
                Remember your password?{" "}
                <Link to="/login" style={{
                  color: "#8E2017",
                  textDecoration: "underline",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}>
                  Login
                </Link>
              </p>
              <p style={{
                fontSize: isMobile ? "13px" : "14px",
                textAlign: "center",
                marginTop: "10px",
                color: "#000",
              }}>
                Don't have an account?{" "}
                <Link to="/signup" style={{
                  color: "#8E2017",
                  textDecoration: "underline",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;