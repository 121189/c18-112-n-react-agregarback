import { useEffect, useState } from "react";

export const useInputList = (initialArray, { minLength = 0 }) => {
  const [items, setItems] = useState(initialArray);
  const [error, setError] = useState(null);
  const [firstSend, setFirstSend] = useState(false);

  const addItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  useEffect(() => {
    if (!firstSend) return;

    if (items.length < minLength) return setError("minLength");
    if (items.some((item) => item.error !== null)) return setError("notEmpty");

    setError(null);
  }, [items, firstSend]);

  const updateItem = (i, newItem) => {
    setItems((prev) => prev.map((ing, idx) => (idx === i ? newItem : ing)));
  };

  const deleteItem = (i) => {
    setItems((prev) => prev.filter((item, index) => index !== i));
  };

  const checkErrors = () => {
    setFirstSend(true);
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    error,
    checkErrors,
  };
};
