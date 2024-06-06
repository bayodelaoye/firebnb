import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [formError, setFormError] = useState({});
  let isDemoUser = false;

  useEffect(() => {
    const errors = {};

    if (credential.length < 4) {
      errors.credential = "Username must be 4 characters or more";
    }

    if (password.length < 6) {
      errors.password = "Password must be 6 characters or more";
    }

    setFormError(errors);
  }, [credential, password]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         setErrors(data.errors);
  //       }
  //     });
  // };

  const createDemoUser = () => {
    isDemoUser = true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDemoUser === true) {
      const demoUser = {
        credential: "demo.user@gmail.com",
        password: "password",
      };

      await dispatch(sessionActions.login(demoUser)).then(closeModal);
    } else {
      setErrors({});
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (parseInt(res.status) === 401) {
            setFormError({ error: "The provided credientials are invalid" });
          }
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  return (
    <>
      <div className="login-text">
        <h1>Log In</h1>
      </div>
      <form onSubmit={handleSubmit} className="login-modal" autoComplete="off">
        {Object.keys(formError).length >= 1 && (
          <p className="login-error">{formError.error}</p>
        )}
        {errors.credential && (
          <p className="login-error">{errors.credential}</p>
        )}
        <label className="credentials-container">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            // required
          />
        </label>
        <label className="password-modal">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            // required
          />
        </label>

        <button className="login-btn" onClick={createDemoUser}>
          Log in as Demo User
        </button>
        {/* <Link>Log in as Demo User</Link> */}

        <button
          type="submit"
          disabled={Object.values(formError).length >= 1}
          className="login-btn"
        >
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
