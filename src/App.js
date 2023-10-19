import React, { useState } from "react";
import "./App.css";
import mdata from "./data.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

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
  });

  return (
    <div>
      <table>
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
    </div>
  );
}

export default App;
