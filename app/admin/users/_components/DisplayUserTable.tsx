"use client";
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
