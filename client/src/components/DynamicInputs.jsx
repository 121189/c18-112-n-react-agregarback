import React from "react";
import { useState } from "react";
import { InputError } from "./InputError";

const DynamicInputs = ({
  title,
  data,
  addItem,
  updateItem,
  deleteItem,
  placeholder,
  displayName,
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const handleAddValue = () => {
    if (input.trim() === "") {
      return;
    }
    addItem({ value: input, error: null });
    setError(null);
    setInput("");
  };

  const handleChangeValue = (index, newValue) => {
    if (newValue.trim() === "") {
      updateItem(index, {
        value: newValue,
        error: `El campo ${displayName} no puede ser vacio`,
      });
      return;
    }
    updateItem(index, { value: newValue, error: null });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="time"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {title}
        </label>
        <div className="grid grid-cols-2 items-center gap-8">
          <input
            type="text"
            className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                handleAddValue();
                return;
              }
            }}
          />
          <button
            onClick={handleAddValue}
            type="button"
            className="place-self-start rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:bg-orange-300 disabled:shadow-none"
          >
            Agregar {displayName}
          </button>
        </div>
        {error && <InputError message={error} />}
      </div>
      {data.map((item, i) => {
        return (
          <div key={i}>
            <div className="grid grid-cols-2 items-center gap-8">
              <input
                type="text"
                className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder={placeholder}
                value={item.value}
                onChange={(e) => handleChangeValue(i, e.target.value)}
              />
              <button
                onClick={(e) => deleteItem(i)}
                type="button"
                className="place-self-start rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-300 disabled:shadow-none"
              >
                Eliminar {displayName}
              </button>
            </div>
            {item.error && <InputError message={item.error} />}
          </div>
        );
      })}
    </div>
  );
};

export default DynamicInputs;
