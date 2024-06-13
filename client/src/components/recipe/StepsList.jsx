import React from "react";

const StepsList = ({ steps }) => {
  return (
    <ul className="list-none space-y-6">
      {steps.map((step, index) => (
        <li className="flex items-start gap-4" key={index}>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xl text-white">
            {index + 1}
          </div>
          <span className="text-lg text-gray-700">{step}</span>
        </li>
      ))}
    </ul>
  );
};

export default StepsList;
