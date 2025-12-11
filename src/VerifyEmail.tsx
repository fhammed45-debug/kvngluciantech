import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import "./VerifyEmailResponsive.css";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  
  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !code) {
      setError("Please enter both email and verification code");
      setLoading(false);
      return;
    }

    if (code.length !== 6) {
      setError("Verification code must be 6 digits");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.verifyEmail({
        email: email,
        code: code,
      });

      const data = response.data;

      if (data.success) {
        // Save token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccess("Email verified successfully! Redirecting...");

        // Redirect to home page after 1 second
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        
        if (errorMessage?.includes("expired")) {
          setError("Verification code has expired. Please request a new one.");
        } else if (errorMessage?.includes("Invalid")) {
          setError("Invalid verification code. Please check and try again.");
        } else {
          setError(errorMessage || "Verification failed. Please try again.");
        }
      } else {
        setError("Failed to connect to server. Please try again later.");
      }
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setResendLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authAPI.resendVerification(email);
      
      if (response.data.success) {
        setSuccess("New verification code sent! Please check your email.");
        setCode(""); // Clear the code input
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error || 
          "Failed to resend code. Please try again."
        );
      } else {
        setError("Failed to connect to server.");
      }
    } finally {
      setResendLoading(false);
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
      <div className="verify-nav" style={{
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

      <div className="verify-outer-container" style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div className="verify-card" style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
        }}>
          {/* Left Section */}
          <div className="verify-left-section" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <h1 className="verify-heading" style={{
              fontWeight: 700,
              color: "#000",
              lineHeight: "1.4",
              marginBottom: "15px",
              margin: "0 0 15px 0",
            }}>
              Almost there! <br />
              Verify your email to continue
            </h1>
            <p className="verify-description" style={{
              color: "#666",
              lineHeight: "1.6",
              margin: 0,
            }}>
              We've sent a 6-digit verification code to your email address.
              Please enter it below to activate your account.
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="verify-right-section" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <h2 className="verify-form-title" style={{
              fontWeight: 700,
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}>
              Email Verification
            </h2>

            {error && (
              <div className="verify-error" style={{
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
              <div className="verify-success" style={{
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
              className="verify-form"
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
                }}
                className="verify-email-input"
                style={{
                  border: "1px solid #999",
                  borderRadius: "6px",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
                disabled={!!emailFromState}
              />
              <input
                type="text"
                name="code"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => {
                  // Only allow numbers and limit to 6 digits
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setCode(value);
                  setError("");
                }}
                className="verify-code-input"
                style={{
                  border: "2px solid #8E2017",
                  borderRadius: "6px",
                  textAlign: "center",
                  fontWeight: "bold",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
                maxLength={6}
                pattern="[0-9]{6}"
              />
              
              <button
                type="submit"
                className="verify-submit-btn"
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
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </form>

            <div className="verify-resend-section" style={{
              textAlign: "center",
              marginTop: "20px",
            }}>
              <p className="verify-resend-text" style={{
                color: "#666",
                marginBottom: "10px",
              }}>
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendCode}
                className="verify-resend-btn"
                style={{
                  backgroundColor: "transparent",
                  color: "#8E2017",
                  border: "2px solid #8E2017",
                  borderRadius: "6px",
                  cursor: resendLoading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  opacity: resendLoading ? 0.6 : 1,
                }}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </div>

            <p className="verify-signup-link" style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#000",
            }}>
              Want to use a different email?{" "}
              <Link to="/signup" style={{
                color: "#8E2017",
                textDecoration: "underline",
                fontWeight: "600",
              }}>
                Sign up again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;