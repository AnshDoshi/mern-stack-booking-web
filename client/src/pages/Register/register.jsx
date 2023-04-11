import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { AuthContext } from "../../context/AuthContext";
import classes from "./register.module.css";

const Register = () => {
 

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();


  const RegisterSchema = object().shape({
    username: string().required("Required Field"),
    password: string().required("Required Field").trim("Required Field"),
     email: string().required("Required Field"),
    city: string().required("Required Field").trim("Required Field"),
    country: string().required("Required Field").trim("Required Field"),
        phone: string().required("Required Field").trim("Required Field"),

  });

  const {values, handleSubmit, handleBlur, handleChange, errors, touched } = useFormik(
    {
      validationSchema: RegisterSchema,

      initialValues: {
       username: "",
       password: "",
       email: "",
    city: "",
    country: "",
    phone: "",
      },

      onSubmit: async (values, { resetForm }, event) => {
        event?.preventDefault();
        handleClick({
          username: values.username,
          password: values.password,
          email:values.email,
          city:values.city,
          country:values.country,
          phone:values.phone
        });
      },

      onReset: () => {},
    }
  );
console.log(values,"<>",errors)

  let errorIsNotThere = Object.keys(errors)?.length === 0;
  let color = !errorIsNotThere ? "grey" : "blue";

  const handleClick = async (valuess) => {
    // e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        valuess
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            type="text"
            placeholder="city"
            id="city"
            onChange={handleChange}
            onBlur={handleBlur}
            className="lInput"
          />
          <input
            type="number"
            placeholder="phone"
            id="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            className="lInput"
            name="phone"

          />
          <input
            type="text"
            placeholder="country"
            id="country"
            name="country"
            
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button disabled={!errorIsNotThere} style={{ margin: "10px",backgroundColor:color }} type="submit">
            Register
          </button>
            {error && <span style={{color:'red'}}>{error.message}</span>}
          <p style={{paddingBottom:"10px"}}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
