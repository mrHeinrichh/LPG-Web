import React from "react";
import style from "./style.module.css";

interface IInputField {
  onChange?: (event: any) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}

function InputField({
  onChange,
  name,
  type,
  placeholder,
  defaultValue,
}: IInputField) {
  return (
    <div className="flex flex-col gap-2">
      {placeholder ? <p>{placeholder}</p> : <></>}
      <input
        className={style.input}
        type={type ?? "text"}
        name={name ?? "name"}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder ?? "placeholder"}
        onChange={onChange ?? (() => {})}
      ></input>
    </div>
  );
}

export default InputField;
