import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import "./SignupResponsive.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const response = await authAPI.register({
        name: fullName,
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      if (data.success) {
        setSuccess(
          "Account created successfully! A verification code has been sent to your email. Please check your inbox."
        );
        
        // Redirect to email verification page after 2 seconds
        setTimeout(() => {
          navigate("/verify-email", { 
            state: { 
              email: formData.email,
              fromSignup: true 
            } 
          });
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        
        if (errorMessage?.includes("already exists")) {
          setError("An account with this email already exists. Please login instead.");
        } else {
          setError(errorMessage || "Signup failed. Please try again.");
        }
      } else {
        setError("Failed to connect to server. Please try again later.");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: "0",
      padding: "0",
      backgroundColor: "#8E2017",
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
      overflowX: "hidden",
    }}>
      <div className="signup-nav" style={{
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

      <div style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }} className="signup-outer-container">
        <div className="signup-card" style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
        }}>
          {/* Left Section */}
          <div className="signup-left-section" style={{
            display: "flex",
            alignItems: "center",
          }}>
            <h1 className="signup-heading" style={{
              fontWeight: 700,
              color: "#000",
              lineHeight: "1.4",
              margin: 0,
            }}>
              It's time to experience the power of technology, it lives in you,
              you only need to activate it.
            </h1>
          </div>

          {/* Right Section - Form */}
          <div className="signup-right-section" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <h2 className="signup-form-title" style={{
              fontWeight: 700,
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}>Create new account</h2>

            {error && (
              <div className="signup-error" style={{
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
              <div className="signup-success" style={{
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
              className="signup-form"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="signup-input"
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
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="signup-input"
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
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="signup-input"
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
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="signup-input"
                style={{
                  border: "1px solid #999",
                  borderRadius: "6px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
                minLength={6}
              />
              <button
                type="submit"
                className="signup-button"
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
                {loading ? "Creating Account..." : "Signup"}
              </button>
            </form>

            <p className="signup-login-link" style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#000",
            }}>
              Already have an account?{" "}
              <Link to="/login" style={{
                color: "#8E2017",
                textDecoration: "underline",
                marginLeft: "5px",
                fontWeight: "600",
              }}>
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;