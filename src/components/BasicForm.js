import React from "react";
import useInputNew from "./../hooks/use-input-new";

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInputNew((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInputNew((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInputNew((value) => value.trim() !== "" && value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  }

  const nameInputClasses = enteredNameHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputClasses = enteredLastNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = enteredEmailHasError
    ? "form-control invalid"
    : "form-control";

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    nameReset();
    lastNameReset();
    emailReset();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {enteredNameHasError && (
            <p className="error-text">Name can not be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {enteredLastNameHasError && (
            <p className="error-text">Name can not be empty</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="emailName">E-Mail Address</label>
          <input
            type="email"
            id="emailName"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {enteredEmailHasError && <p className="error-text">Invalid email</p>}
        </div>
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
