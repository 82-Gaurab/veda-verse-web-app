/* eslint-disable react-hooks/incompatible-library */
"use client";
// import * as React from "react";

// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   status: string;
//   progress: number;
// };

// const defaultData: Person[] = [
//   {
//     firstName: "tanner",
//     lastName: "linsley",
//     age: 24,
//     visits: 100,
//     status: "In Relationship",
//     progress: 50,
//   },
//   {
//     firstName: "tandy",
//     lastName: "miller",
//     age: 40,
//     visits: 40,
//     status: "Single",
//     progress: 80,
//   },
//   {
//     firstName: "joe",
//     lastName: "dirte",
//     age: 45,
//     visits: 20,
//     status: "Complicated",
//     progress: 10,
//   },
// ];

// const columnHelper = createColumnHelper<Person>();

// const columns = [
//   columnHelper.accessor("firstName", {
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor((row) => row.lastName, {
//     id: "lastName",
//     cell: (info) => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("age", {
//     header: () => "Age",
//     cell: (info) => info.renderValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("visits", {
//     header: () => <span>Visits</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("status", {
//     header: "Status",
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("progress", {
//     header: "Profile Progress",
//     footer: (info) => info.column.id,
//   }),
// ];

// export default function DisplayUserTable() {
//   const [data, setData] = React.useState(() => [...defaultData]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="p-2">
//       <table className="border border-gray-300">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   className="border-b border-r border-gray-300 px-1 py-0.5"
//                   key={header.id}
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext(),
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody className="border-b border-gray-300">
//           {table.getRowModel().rows.map((row) => (
//             <tr className="border-r border-gray-300" key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import DataTable from "react-data-table-component";
export default function DisplayUserTable() {
  type Person = {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
  const users: Person[] = [
    {
      userId: "id101",
      firstName: "tanner",
      lastName: "linsley",
      username: "tanner",
      email: "tanner@gmail.com",
      role: "user",
    },
    {
      userId: "id102",
      firstName: "tandy",
      lastName: "miller",
      username: "miller",
      email: "miller@gmail.com",
      role: "user",
    },
    {
      userId: "id103",
      firstName: "joe",
      lastName: "dirte",
      username: "joe",
      email: "dirte@gmail.com",
      role: "user",
    },
  ];
  const userColumns = [
    {
      name: "User ID",
      selector: (row: { userId: string }) => row.userId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: { username: string }) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: { role: string }) => row.role,
      sortable: true,
    },
  ];
  return (
    <div className="mb-8 mt-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">User List</h1>

      <DataTable
        columns={userColumns}
        data={users}
        pagination
        highlightOnHover
        keyField="userId"
        className="w-full border-collapse"
      />
    </div>
  );
}
