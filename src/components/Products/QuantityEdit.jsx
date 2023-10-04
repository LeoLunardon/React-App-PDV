import React from "react";

const QuantityEdit = ({ quantity, onQuantityChange }) => {
  const options = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <select
      className="block p-2 border border-gray-300 rounded"
      value={quantity}
      onChange={(e) => onQuantityChange(parseInt(e.target.value))}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default QuantityEdit;
