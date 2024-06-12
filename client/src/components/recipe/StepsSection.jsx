import React from "react";
import StepsList from "./StepsList";

const StepsSection = ({ steps }) => {
  return (
    <div className="min-h-14 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Pasos de la receta
      </h2>
      <StepsList steps={steps} />
    </div>
  );
};

export default StepsSection;
