import React, { useState, useEffect } from "react";
import BudgetDataService from "../services/BudgetService";

const Budget = props => {
  console.log('alpha')
  const initialBudgetState = {
    _id: '',
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
  };
  const [currentBudget, setCurrentBudget] = useState(initialBudgetState);
  const [message, setMessage] = useState("");

  const getBudget = id => {
    BudgetDataService.get(id)
      .then(response => {
        setCurrentBudget(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log('props:', props.match.params.id)
    getBudget(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBudget({ ...currentBudget, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      ...currentBudget
    };

    BudgetDataService.update(currentBudget._id, data)
      .then(response => {
        setCurrentBudget({ ...currentBudget, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBudget = () => {
    BudgetDataService.update(currentBudget._id, currentBudget)
      .then(response => {
        console.log(response.data);
        setMessage("The budget was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBudget = () => {
    BudgetDataService.remove(currentBudget.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/budgets");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBudget ? (
        <div className="edit-form">
          <h4>Budget</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBudget.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBudget.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBudget.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBudget.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBudget}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBudget}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Budget...</p>
        </div>
      )}
    </div>
  );
};

export default Budget;
