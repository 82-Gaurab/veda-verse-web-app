// /* eslint-disable react-hooks/incompatible-library */
"use client";
// // import * as React from "react";

// // import {
// //   createColumnHelper,
// //   flexRender,
// //   getCoreRowModel,
// //   useReactTable,
// // } from "@tanstack/react-table";

// // type Person = {
// //   firstName: string;
// //   lastName: string;
// //   age: number;
// //   visits: number;
// //   status: string;
// //   progress: number;
// // };

// // const defaultData: Person[] = [
// //   {
// //     firstName: "tanner",
// //     lastName: "linsley",
// //     age: 24,
// //     visits: 100,
// //     status: "In Relationship",
// //     progress: 50,
// //   },
// //   {
// //     firstName: "tandy",
// //     lastName: "miller",
// //     age: 40,
// //     visits: 40,
// //     status: "Single",
// //     progress: 80,
// //   },
// //   {
// //     firstName: "joe",
// //     lastName: "dirte",
// //     age: 45,
// //     visits: 20,
// //     status: "Complicated",
// //     progress: 10,
// //   },
// // ];

// // const columnHelper = createColumnHelper<Person>();

// // const columns = [
// //   columnHelper.accessor("firstName", {
// //     cell: (info) => info.getValue(),
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor((row) => row.lastName, {
// //     id: "lastName",
// //     cell: (info) => <i>{info.getValue()}</i>,
// //     header: () => <span>Last Name</span>,
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("age", {
// //     header: () => "Age",
// //     cell: (info) => info.renderValue(),
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("visits", {
// //     header: () => <span>Visits</span>,
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("status", {
// //     header: "Status",
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("progress", {
// //     header: "Profile Progress",
// //     footer: (info) => info.column.id,
// //   }),
// // ];

// // export default function DisplayUserTable() {
// //   const [data, setData] = React.useState(() => [...defaultData]);

// //   const table = useReactTable({
// //     data,
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //   });

// //   return (
// //     <div className="p-2">
// //       <table className="border border-gray-300">
// //         <thead>
// //           {table.getHeaderGroups().map((headerGroup) => (
// //             <tr key={headerGroup.id}>
// //               {headerGroup.headers.map((header) => (
// //                 <th
// //                   className="border-b border-r border-gray-300 px-1 py-0.5"
// //                   key={header.id}
// //                 >
// //                   {header.isPlaceholder
// //                     ? null
// //                     : flexRender(
// //                         header.column.columnDef.header,
// //                         header.getContext(),
// //                       )}
// //                 </th>
// //               ))}
// //             </tr>
// //           ))}
// //         </thead>
// //         <tbody className="border-b border-gray-300">
// //           {table.getRowModel().rows.map((row) => (
// //             <tr className="border-r border-gray-300" key={row.id}>
// //               {row.getVisibleCells().map((cell) => (
// //                 <td key={cell.id}>
// //                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "next/image";
export default function DisplayUserTable({
  users,
  pagination,
  search,
}: {
  users: any[];
  pagination: any;
  search?: string;
}) {
  type User = {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
    role: string;
  };
  // const users: Person[] = [
  //   {
  //     userId: "id101",
  //     firstName: "tanner",
  //     lastName: "linsley",
  //     username: "tanner",
  //     email: "tanner@gmail.com",
  //     role: "user",
  //   },
  //   {
  //     userId: "id102",
  //     firstName: "tandy",
  //     lastName: "miller",
  //     username: "miller",
  //     email: "miller@gmail.com",
  //     role: "user",
  //   },
  //   {
  //     userId: "id103",
  //     firstName: "joe",
  //     lastName: "dirte",
  //     username: "joe",
  //     email: "dirte@gmail.com",
  //     role: "user",
  //   },
  // ];
  const userColumns: TableColumn<User>[] = [
    {
      name: "User ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.profilePicture ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${row.profilePicture}`}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            N/A
          </div>
        ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];
  return (
    <div className="mb-8 mt-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">User List</h1>

      <DataTable
        columns={userColumns}
        data={users}
        paginationServer={pagination}
        highlightOnHover
        keyField="_id"
        className="w-full border-collapse"
      />
    </div>
  );
}
