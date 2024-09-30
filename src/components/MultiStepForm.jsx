import React, { useState } from 'react';

const MultiStepForm = ({ children, submit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const fieldsPerPage = 3; // Number of fields to show per step

  const totalFields = React.Children.count(children); // Total number of InputField components

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Calculate which fields to display based on currentStep
  const startIdx = (currentStep - 1) * fieldsPerPage;
  const endIdx = Math.min(currentStep * fieldsPerPage, totalFields);
  const displayedFields = React.Children.toArray(children).slice(startIdx, endIdx);

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={submit}>
        <div>
          <h2 className="text-lg font-semibold mb-4">Step {currentStep}: Personal Information</h2>
          <div className="mb-4">
            {displayedFields}       {/* Need to store its state even if next / previous button are clicked, work on it */}
          </div>
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Previous
              </button>
            )}
            {currentStep < Math.ceil(totalFields / fieldsPerPage) ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary-purple-500 p-3 rounded-md px-8 mt-10 w-full hover:bg-secondary-blue-500"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
