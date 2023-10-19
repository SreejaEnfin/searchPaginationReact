import React, { useState } from "react";
import "./App.css";
import mdata from "./data.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { tab } from "@testing-library/user-event/dist/tab";

function App() {
  // using tanstack
  const [data, setResults] = useState(mdata.results.slice(0, 49));
  // const data = useMemo(() => results, []);

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Name",
      accessorKey: "name.first",
    },
    {
      header: "Location",
      accessorKey: "location.country",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Login",
      accessorKey: "login.username",
    },
  ];

  console.log(columns);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w3-container">
      <table className="w3-table w3-striped">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginationButtons">
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage}
        >
          Next
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
}

export default App;
