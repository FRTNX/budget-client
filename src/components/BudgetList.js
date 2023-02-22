import React, { useState, useEffect, useMemo, useRef } from "react";
import BudgetDataService from "../services/BudgetService";
import { useTable } from "react-table";

const BudgetList = (props) => {
  const [budgets, setBudgets] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const budgetsRef = useRef();

  budgetsRef.current = budgets;

  useEffect(() => {
    retrieveBudgets();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBudgets = () => {
    BudgetDataService.getAll()
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBudgets();
  };

  const removeAllBudgets = () => {
    BudgetDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openBudget = (rowIndex) => {
    console.log('budget state: ', budgetsRef.current[rowIndex]._id);
    const id = budgetsRef.current[rowIndex]._id;

    props.history.push("/budgets/" + id);
  };

  const deleteBudget = (rowIndex) => {
    const id = budgetsRef.current[rowIndex]._id;

    BudgetDataService.remove(id)
      .then((response) => {
        props.history.push("/budgets");

        let newBudgets = [...budgetsRef.current];
        newBudgets.splice(rowIndex, 1);

        setBudgets(newBudgets);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Group",
        accessor: "group",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Program",
        accessor: "sub_program",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Unit of Measure",
        accessor: "unit_of_measure",
      },
      {
        Header: "Period",
        accessor: "period",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Unit Price",
        accessor: "unit_price",
      },
      {
        Header: "Total (Exclusive)",
        accessor: "total_exclusive",
      },
      {
        Header: "VAT",
        accessor: "vat",
      },
      {
        Header: "Total (Inclusive)",
        accessor: "total_inclusive",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openBudget(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteBudget(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: budgets,
  });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllBudgets}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default BudgetList;
