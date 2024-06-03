import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [formError, setFormError] = useState({});

  const userState = useSelector((state) => state);
  console.log(userState);

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
  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {Object.keys(formError).length >= 1 && <p>{formError.error}</p>}
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit" disabled={Object.values(formError).length >= 1}>
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
