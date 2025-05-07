import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../Apiconfiguration/config";

const login_validate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export default function Login() {
  const { checkAuthorization, setIsLogin, setUsername, setload } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: login_validate,
    onSubmit: async (values) => {
      setLoginError("");
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body: new URLSearchParams({
            username: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.authorized) {
            setload(true);
            setUsername(data.username);
            alert("Successfully logged in.");
            setIsLogin(false);
            navigate("/");
            checkAuthorization();
          }
        } else {
          const errorData = await response.json();
          setLoginError(errorData.detail || "Login failed. Please try again.");
        }
      } catch (error) {
        setLoginError("An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary">Sign In</h2>

        {loginError && (
          <div className="alert alert-danger text-center py-2">
            {loginError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success fw-bold">
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-3">
          Don’t have an account yet?{" "}
          <a
            href="/register"
            className="text-decoration-none text-primary fw-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
