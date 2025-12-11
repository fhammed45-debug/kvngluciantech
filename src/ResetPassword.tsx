import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import "./ResetPasswordResponsive.css";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Invalid or missing reset token");
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      setLoading(false);
      return;
    }

    try {
      await authAPI.resetPassword({
        token: token,
        newPassword: formData.newPassword,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error ||
            "Failed to reset password. The link may have expired."
        );
      } else {
        setError("Failed to connect to server. Please try again later.");
      }
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="reset-success-container" style={{
        backgroundColor: "#8E2017",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
        <div className="reset-success-card" style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}>
          <div className="reset-success-icon" style={{
            fontSize: "48px",
            color: "#4CAF50",
            marginBottom: "20px",
          }}>
            ✓
          </div>
          <h2 className="reset-success-title" style={{
            color: "#4CAF50",
            marginBottom: "20px",
          }}>
            Password Reset Successful!
          </h2>
          <p className="reset-success-text" style={{ 
            marginBottom: "20px" 
          }}>
            Your password has been successfully reset.
          </p>
          <p className="reset-success-redirect" style={{ 
            color: "#666" 
          }}>
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

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
      <div className="reset-nav" style={{
        color: "#fff",
      }}>
        <Link to="/Login" style={{
          color: "#fff",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}>
          ← Back to Login
        </Link>
      </div>

      <div className="reset-outer-container" style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div className="reset-card" style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "500px",
          boxSizing: "border-box",
        }}>
          <h2 className="reset-title" style={{
            fontWeight: 700,
            marginBottom: "10px",
            margin: "0 0 10px 0",
            textAlign: "center",
          }}>
            Reset Password
          </h2>
          
          <p className="reset-subtitle" style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}>
            Enter your new password below
          </p>

          {error && (
            <div className="reset-error" style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              borderRadius: "6px",
              marginBottom: "20px",
              textAlign: "center",
              border: "1px solid #ef9a9a",
            }}>
              {error}
            </div>
          )}

          <form
            className="reset-form"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <label className="reset-label" style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}>
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="reset-input"
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
            </div>

            <div>
              <label className="reset-label" style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="reset-input"
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
            </div>

            <button
              type="submit"
              className="reset-submit-btn"
              style={{
                backgroundColor: "#8E2017",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
                opacity: loading ? 0.6 : 1,
                width: "100%",
                boxSizing: "border-box",
                marginTop: "10px",
              }}
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <p className="reset-login-link" style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#666",
          }}>
            Remember your password?{" "}
            <Link to="/Login" style={{
              color: "#8E2017",
              textDecoration: "underline",
              fontWeight: "600",
            }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;