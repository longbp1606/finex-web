/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Steps, Button } from "antd";
import "./index.css";
import Budget from "./BudgetCard";
// import AddTransaction from "./AddTransaction";
import { Outlet } from "react-router-dom";

const Transaction = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Budget />;
      case 1:
        return <Outlet />;
      // case 2:
      //   return <h2>Review & Submit</h2>;
      default:
        return <Budget />;
    }
  };

  return (
    <div className="transaction_area">
      <Steps
        progressDot
        current={currentStep}
        onChange={setCurrentStep} // Cho phép click vào bước để chuyển
        items={[
          { 
            title: "Choose budget", 
            // description: "This is a description."
          },
          { 
            title: "Add transaction", 
            // description: "This is a description." 
          },
          // { 
          //   title: "Review & Submit", 
          //   // description: "This is a description." 
          // },
        ]}
      />

      <div className="step-content">{renderStepContent()}</div>

      <div className="step-actions">
        {currentStep > 0 && (
          <Button onClick={prev} style={{ marginRight: 10 }}>
            Previous
          </Button>
        )}
        {currentStep < 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {currentStep === 1 && (
          <Button type="primary" onClick={() => alert("Submitted!")}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Transaction;
