import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Execute } from "../api/ApiClient";

const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const Table = ({ endpoint, name }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [totalPages, setTotalPages] = useState(0);
  const [filtering, setFiltering] = useState("");

  const fetchData = useCallback(() => {
    Execute(
      `/v2/${endpoint}?page=${pagination.pageIndex}&size=${pagination.pageSize}&filters=` +
        JSON.stringify(["NAME", "LIKE", filtering])
    )
      .then((result) => {
        setData(result.items);
        setTotalPages(result.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination, filtering, endpoint]);

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

  useEffect(() => {
    debouncedFetchData();
  }, [pagination, filtering, debouncedFetchData]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("NAME", {
      header: "Name",
      cell: (info) => info.getValue(),
      size: 400,
    }),
    columnHelper.accessor("PRICE", {
      header: "Price",
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor("EXPOSURE", {
      header: "Exposure",
      cell: (info) => info.getValue(),
      size: 100,
    }),
    columnHelper.display({
      id: "edit",
      header: "Edit",
      cell: ({ row }) => (
        <Link
          to={`/edit/${name}/${row.original.guid}`}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </Link>
      ),
      size: 50,
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-primary-bg-500 p-4 w-[1400px]">
      <div className="w-1/3 flex items-center justify-center mb-4 relative">
        <input
          id="searchterm"
          className="px-2 py-2 w-full bg-neutral-bg-600 focus:bg-text-100"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        <button
          onClick={() => setFiltering("")}
          className="absolute right-0 px-4 py-[10px] bg-primary-purple-500 rounded-r-md border-l-2 border-l-primary-bg-500"
        >
          <FaXmark className="h-5 w-5 text-text-100" />
        </button>
      </div>
      <div className="overflow-y-auto" style={{ height: "550px" }}>
        <table className="min-w-full divide-y divide-neutral-bg-600">
          <thead className="bg-neutral-bg-700 text-text-100 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-left text-md"
                    style={{ width: `${header.getSize()}px` }}
                  >
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
          <tbody className="bg-neutral-bg-800 text-text-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-neutral-bg-700">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-neutral-bg-700 text-text-100 sticky bottom-0 z-10">
        <div className="p-2 flex items-center justify-between">
          <div></div>
          <div className="flex gap-4 items-center justify-center">
            <button
              className="text-text-100 bg-neutral-bg-700 px-[10px] py-2 text-center rounded-full hover:bg-neutral-bg-600 cursor-pointer"
              onClick={() => setPagination({ ...pagination, pageIndex: 0 })}
              disabled={pagination.pageIndex === 0}
            >
              {"<<"}
            </button>
            <button
              className="text-text-100 bg-neutral-bg-700 px-[16px] py-2 text-center rounded-full hover:bg-neutral-bg-600 cursor-pointer"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex - 1,
                })
              }
              disabled={pagination.pageIndex === 0}
            >
              {"<"}
            </button>
            <button
              className="text-text-100 bg-neutral-bg-700 px-[16px] py-2 text-center rounded-full hover:bg-neutral-bg-600 cursor-pointer"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex + 1,
                })
              }
              disabled={pagination.pageIndex >= totalPages - 1}
            >
              {">"}
            </button>
            <button
              className="text-text-100 bg-neutral-bg-700 px-[10px] py-2 text-center rounded-full hover:bg-neutral-bg-600 cursor-pointer"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: totalPages - 1,
                })
              }
              disabled={pagination.pageIndex >= totalPages - 1}
            >
              {">>"}
            </button>
            <p className="text-text-100">
              {pagination.pageIndex + 1} of {totalPages}
            </p>
            <select
              id="pagination"
              className="w-14 py-1 text-[black]"
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination({
                  ...pagination,
                  pageSize: e.target.value,
                })
              }
            >
              {[20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
