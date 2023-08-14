import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, currency } = useContext(AppContext);
    const [editableBudget, setEditableBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const newBudget = parseFloat(event.target.value);
        setEditableBudget(newBudget);
    };

    const updateBudget = () => {
        if (editableBudget < expensesTotal()) {
            alert("Budget cannot be lower than total expenses.");
        } else if (editableBudget > 20000) {
            alert("Budget cannot exceed 20,000.");
        } else {
            dispatch({
                type: 'SET_BUDGET',
                payload: editableBudget,
            });
        }
    };

    const expensesTotal = () => {
        return expenses.reduce((total, expense) => total + expense.cost, 0);
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input
                type="number"
                step="10"
                min="0"
                max="20000"
                value={editableBudget}
                onChange={handleBudgetChange}
                onBlur={updateBudget}
            />
        </div>
    );
};

export default Budget;
