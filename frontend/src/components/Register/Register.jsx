import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../Apiconfiguration/config.js";

const register_validate = (values) => {
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

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validate: register_validate,
    onSubmit: async (values) => {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        alert("Successfully Registered");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`${errorData.detail}`);
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-success">Create an Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              placeholder="Enter your email"
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
              className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="invalid-feedback">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <span>Already have an account? </span>
          <Link to="/login" className="text-decoration-none text-primary">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
