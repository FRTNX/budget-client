import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddBudget from "./components/AddBudget";
import Budget from "./components/Budget";
import BudgetList from "./components/BudgetList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/budgets" className="navbar-brand">
          Olimem
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Budget
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/budgets"]} component={BudgetList} />
          <Route exact path="/add" component={AddBudget} />
          <Route path="/budget/:id" component={Budget} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
