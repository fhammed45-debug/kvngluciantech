import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import "./ForgotPasswordResponsive.css";

const ForgotPassword: React.FC = () => {
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
      <div className="forgot-nav" style={{
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

      <div className="forgot-outer-container" style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div className="forgot-card" style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
        }}>
          {/* Left Section */}
          <div className="forgot-left-section" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
            <h1 className="forgot-heading" style={{
              fontWeight: 700,
              color: "#000",
              lineHeight: "1.4",
              marginBottom: "10px",
              margin: "0 0 10px 0",
            }}>
              Reset your password
            </h1>
            <p className="forgot-description" style={{
              color: "#666",
              lineHeight: "1.5",
              margin: 0,
            }}>
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="forgot-right-section" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <h2 className="forgot-form-title" style={{
              fontWeight: 700,
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}>
              Forgot Password
            </h2>

            {error && (
              <div className="forgot-error" style={{
                backgroundColor: "#ffebee",
                color: "#c62828",
                borderRadius: "6px",
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ef9a9a",
              }}>
                {error}
              </div>
            )}

            {success && (
              <div className="forgot-success" style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                borderRadius: "6px",
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #a5d6a7",
              }}>
                {success}
              </div>
            )}

            <form
              className="forgot-form"
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="forgot-input"
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
                className="forgot-submit-btn"
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="forgot-links-section" style={{
              marginTop: "20px",
            }}>
              <p className="forgot-login-link" style={{
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
              <p className="forgot-signup-link" style={{
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