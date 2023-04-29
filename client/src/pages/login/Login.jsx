import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { AuthContext } from "../../context/AuthContext";
import classes from "./login.module.css";

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const LoginSchema = object().shape({
    username: string().required("Required Field"),
    password: string().required("Required Field").trim("Required Field"),
  });

  const { handleSubmit, handleBlur, handleChange, errors, touched } = useFormik(
    {
      validationSchema: LoginSchema,

      initialValues: { username: "", password: "" },

      onSubmit: async (values, { resetForm }, event) => {
        event?.preventDefault();
        handleClick({
          username: values.username,
          password: values.password,
        });
      },

      onReset: () => {},
    }
  );

  const handleClick = async (values) => {
    // e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        values
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  let errorIsNotThere = Object.keys(errors)?.length === 0;
  let color = !errorIsNotThere ? "grey" : "blue";

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            id="username"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            onBlur={handleBlur}
            id="password"
            onChange={handleChange}
          />
          <button
            style={{ backgroundColor: color }}
            disabled={!errorIsNotThere}
            type="submit"
          >
            Sign in
          </button>
          {error && <span>{error.message}</span>}
          <p>
            Already have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
