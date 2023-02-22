import React, { useState } from "react";
import BudgetDataService from "../services/BudgetService";

const AddBudget = () => {
  const [budget, setBudget] = useState({
    description: '',
    group: '',
    category: '',
    program: '',
    sub_program: '',
    department: '',
    unit_of_measure: '',
    period: '',
    quantity: '',
    unit_price: '',
    total_exclusive: '',
    vat: '',
    total_inclusive: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBudget({ ...budget, [name]: value });
  };

  const saveBudget = () => {
    var data = {
      ...budget
    };

    BudgetDataService.create(data)
      .then(response => {
        setBudget({
          ...response.data
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBudget = () => {
    setBudget({
      description: '',
      group: '',
      category: '',
      program: '',
      sub_program: '',
      department: '',
      unit_of_measure: '',
      period: '',
      quantity: '',
      unit_price: '',
      total_exclusive: '',
      vat: '',
      total_inclusive: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBudget}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={budget.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="group">Group</label>
            <input
              type="text"
              className="form-control"
              id="group"
              required
              value={budget.group}
              onChange={handleInputChange}
              name="group"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={budget.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>

          <div className="form-group">
            <label htmlFor="program">Program</label>
            <input
              type="text"
              className="form-control"
              id="program"
              required
              value={budget.program}
              onChange={handleInputChange}
              name="program"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sub_program">Sub-Program</label>
            <input
              type="text"
              className="form-control"
              id="sub_program"
              required
              value={budget.sub_program}
              onChange={handleInputChange}
              name="sub_program"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              required
              value={budget.department}
              onChange={handleInputChange}
              name="department"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit_of_measure">Unit of Measure</label>
            <input
              type="text"
              className="form-control"
              id="unit_of_measure"
              required
              value={budget.unit_of_measure}
              onChange={handleInputChange}
              name="unit_of_measure"
            />
          </div>

          <div className="form-group">
            <label htmlFor="period">Period</label>
            <input
              type="text"
              className="form-control"
              id="period"
              required
              value={budget.period}
              onChange={handleInputChange}
              name="period"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              required
              value={budget.quantity}
              onChange={handleInputChange}
              name="quantity"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit_price">Unit Price</label>
            <input
              type="text"
              className="form-control"
              id="unit_price"
              required
              value={budget.unit_price}
              onChange={handleInputChange}
              name="unit_price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_exclusive">Total (Exclusive)</label>
            <input
              type="text"
              className="form-control"
              id="total_exclusive"
              required
              value={budget.total_exclusive}
              onChange={handleInputChange}
              name="total_exclusive"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vat">VAT</label>
            <input
              type="text"
              className="form-control"
              id="vat"
              required
              value={budget.vat}
              onChange={handleInputChange}
              name="vat"
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_inclusive">Total (Inclusive)</label>
            <input
              type="text"
              className="form-control"
              id="total_inclusive"
              required
              value={budget.total_inclusive}
              onChange={handleInputChange}
              name="total_inclusive"
            />
          </div>

          <button onClick={saveBudget} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBudget;
