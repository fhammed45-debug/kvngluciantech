import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { authAPI } from "./services";
import axios from "axios";
import { useResponsive } from "./hooks/useResponsive";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isMobile } = useResponsive();
  
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
      <div style={{
        backgroundColor: "#8E2017",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: isMobile ? "30px 20px" : "50px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "48px",
            color: "#4CAF50",
            marginBottom: "20px",
          }}>
            ✓
          </div>
          <h2 style={{
            color: "#4CAF50",
            marginBottom: "20px",
          }}>
            Password Reset Successful!
          </h2>
          <p style={{ marginBottom: "20px" }}>
            Your password has been successfully reset.
          </p>
          <p style={{ color: "#666" }}>
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
      <div style={{
        color: "#fff",
        padding: isMobile ? "15px 20px" : "20px 40px",
        fontSize: isMobile ? "14px" : "16px",
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

      <div style={{
        backgroundColor: "#8E2017",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: isMobile ? "20px 15px" : "20px",
      }}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: isMobile ? "10px" : "15px",
          padding: isMobile ? "30px 20px" : "50px",
          width: "100%",
          maxWidth: "500px",
          boxSizing: "border-box",
        }}>
          <h2 style={{
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            fontWeight: 700,
            marginBottom: "10px",
            margin: "0 0 10px 0",
            textAlign: "center",
          }}>
            Reset Password
          </h2>
          
          <p style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
            fontSize: isMobile ? "14px" : "15px",
          }}>
            Enter your new password below
          </p>

          {error && (
            <div style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: isMobile ? "10px" : "12px",
              borderRadius: "6px",
              marginBottom: "20px",
              fontSize: isMobile ? "13px" : "14px",
              textAlign: "center",
              border: "1px solid #ef9a9a",
            }}>
              {error}
            </div>
          )}

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "15px" : "20px",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: isMobile ? "14px" : "15px",
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
                minLength={6}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: isMobile ? "14px" : "15px",
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
                minLength={6}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#8E2017",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: isMobile ? "12px" : "14px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: isMobile ? "15px" : "16px",
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

          <p style={{
            fontSize: isMobile ? "13px" : "14px",
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