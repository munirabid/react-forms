import React from "react";

const initialInputValues = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "INPUT") {
    return { value: "", isTouched: false };
  }
  return initialInputValues;
};

const useInputNew = (applyValidation) => {
  const [inputState, dispatch] = React.useReducer(
    inputStateReducer,
    initialInputValues
  );

  const isValidInput = applyValidation(inputState.value);

  const hasError = !isValidInput && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: isValidInput,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputNew;
