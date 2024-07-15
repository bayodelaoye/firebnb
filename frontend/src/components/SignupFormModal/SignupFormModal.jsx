import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { Navigate } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(true);

  useEffect(() => {
    const errors = {};

    if (email.length < 1) {
      errors.email = "Email is required";
    } else if (username.length < 4) {
      errors.username = "Username must be more than four characters";
    } else if (firstName.length < 1) {
      errors.firstName = "First Name is required";
    } else if (lastName.length < 1) {
      errors.lastName = "Last Name is required";
    } else if (password.length < 6) {
      errors.password = "Password must be more than six characters";
    } else if (confirmPassword.length < 6) {
      errors.confirmPassword =
        "Confirm Password must be more than six characters";
    }

    setFormErrors(errors);
    setErrors(errors);

    // setErrors(errors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (password === confirmPassword) {
      setErrors({});

      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (parseInt(res.status) === 500) {
            if (!email.includes("@")) {
              setFormErrors({ error: "The provided email is invalid" });
            } else {
              console.log(res);
              setFormErrors({
                error:
                  "User with that email already exists and or Username must be unique",
              });
            }
          }
          if (data?.errors) {
            setErrors(data.errors);
          }

          <Navigate to={"/"} />;
        });
    }
    return setFormErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1 className="signup-text">Sign Up</h1>
      <form onSubmit={handleSubmit} className="sign-up-modal">
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.error}</p>
        )}
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.passwordError}</p>
        )}
        <label className="sign-up-label-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        {isSubmitted ? (
          <></>
        ) : Object.keys(formErrors).length >= 1 ||
          Object.keys(errors).length ? (
          <p className="sign-up-error">{formErrors.email}</p>
        ) : (
          <></>
        )}
        {/* {errors.email && <p>{errors.email}</p>} */}
        <label className="sign-up-label-input">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </label>
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.username}</p>
        )}
        {/* {errors.username && <p>{errors.username}</p>} */}
        <label className="sign-up-label-input">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.firstName}</p>
        )}
        {/* {errors.firstName && <p>{errors.firstName}</p>} */}
        <label className="sign-up-label-input">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.lastName}</p>
        )}
        {/* {errors.lastName && <p>{errors.lastName}</p>} */}
        <label className="sign-up-label-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.password}</p>
        )}
        {/* {errors.password && <p>{errors.password}</p>} */}
        <label className="sign-up-label-input">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        {Object.keys(formErrors).length >= 1 && (
          <p className="sign-up-error">{formErrors.confirmPassword}</p>
        )}
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        {Object.keys(formErrors).length >= 1 ? (
          <button
            className="sign-up-btn-disabled"
            type="submit"
            disabled={Object.keys(formErrors).length >= 1}
          >
            Sign Up
          </button>
        ) : (
          <button
            id="sign-up-btn"
            type="submit"
            disabled={Object.keys(formErrors).length >= 1}
          >
            Sign Up
          </button>
        )}
      </form>
    </>
  );
}

export default SignupFormModal;
