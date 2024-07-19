import React, { useState } from "react";

function FormInput(props) {
  const {
    label,
    className,
    errorMessage,
    id,
    onChange,
    type,
    value,
    name,
    htmlFor,
    enabled,
    required,
    placeholder
  } = props;
  return (
    <div className="w-full max-w-xs sm:max-w-md mx-auto">
      <label
        htmlFor={htmlFor}
        className={
          className
            ? className
            : "block text-sm font-medium leading-6 text-gray-900"
        }
      >
        {label}
      </label>
      <div className="mt-2 flex flex-col gap-1">
        <input
          type={type ? type : "text"}
          required={required ? required : true}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          disabled={enabled ? enabled : false}
          placeholder={placeholder ? placeholder : ""}
          autoComplete="off"
          className="block w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errorMessage && (
          <span className="px-2 mt-1 rounded-md bg-red-600 text-white text-sm">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}

export default FormInput;
