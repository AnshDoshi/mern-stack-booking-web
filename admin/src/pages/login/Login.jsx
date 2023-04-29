import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import classes from "./login.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    // <div className="login" >
    //   <div className="lContainer">
    //     <input
    //       type="text"
    //       placeholder="username"
    //       id="username"
    //       onChange={handleChange}
    //       className="lInput"
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       id="password"
    //       onChange={handleChange}
    //       className="lInput"
    //     />
    //     <button disabled={loading} onClick={handleClick} className="lButton">
    //       Login
    //     </button>
    //     {error && <span>{error.message}</span>}
    //   </div>
    // </div>
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleClick}>
          <input
            type="text"
            placeholder="username"
            id="username"
            // onBlur={handleBlur}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            // onBlur={handleBlur}
            id="password"
            onChange={handleChange}
          />
          <button
            // style={{ backgroundColor: color }}
            // disabled={!errorIsNotThere}
            type="submit"
            disabled={loading}
          >
            Sign in
          </button>
          {error && <span>{error?.message}</span>}
          <p>
            {/* Already have an account? <Link to="/register">Register</Link> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
