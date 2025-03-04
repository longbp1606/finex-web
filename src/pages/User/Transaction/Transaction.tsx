import { useState } from "react";
import AddTransaction from "./AddTransaction";
import Budget from "./BudgetCard";

const Transaction = () => {
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  return (
    <div className="transaction_area">
      {selectedBudgetId ? (
        <AddTransaction id={selectedBudgetId} onBack={() => setSelectedBudgetId(null)} />
      ) : (
        <Budget onSelectBudget={(id) => setSelectedBudgetId(id)} />
      )}
    </div>
  );
};

export default Transaction;
