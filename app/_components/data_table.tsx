"use client";



import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleCheckboxChange = (rowId: string) => {
        setSelectedRowId(rowId === selectedRowId ? null : rowId);
    };

    const [columnWidths, setColumnWidths] = useState(() => {
        const initialWidth = `${100 / columns.length}%`;
        return Array(columns.length).fill(initialWidth);
    });

   

    return (
        <div className="space-y-4">
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                style={{
                                    position: "sticky",
                                    left: 0,
                                    zIndex: 1,
                                    backgroundColor: "white",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRowId !== null}
                                    onChange={() => {
                                        setSelectedRowId(null);
                                    }}
                                />
                            </TableHead>

                            {table.getHeaderGroups().map((headerGroup, index) => (
                                <React.Fragment key={headerGroup.id}>
                                    {headerGroup.headers.map((header, idx) => (
                                        <TableHead
                                            className="hover:bg-[#F1F5F9]"
                                            key={header.id}
                                            style={{
                                                position: idx < 1 ? "sticky" : "relative",
                                                left: idx < 1 ? "29px" : "auto",
                                                zIndex: idx < 1 ? 1 : "auto",
                                                width: columnWidths[idx],
                                                backgroundColor: idx < 1 ? "white" : "",

                                                pointerEvents:
                                                    idx < 2
                                                        ? "none"
                                                        : "auto" ,
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                          

                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className={`hover:bg-[#F1F5F9]  ${
                                        row.id === selectedRowId ? "!bg-[#F1F5F9]" : ""
                                    }  `}
                                    key={row.id}
                                    data-state={row.id === selectedRowId ? "selected" : undefined}
                                    onMouseEnter={() => {}}
                                    onMouseLeave={() => {}}
                                >
                                    <TableCell
                                        style={{
                                            position: "sticky",
                                            left: 0,
                                            width: "10px",
                                            zIndex: 1,
                                            backgroundColor: "white",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={row.id === selectedRowId}
                                            onChange={() => handleCheckboxChange(row.id)}
                                        />
                                    </TableCell>
                                    {row.getVisibleCells().map((cell, idx) => (
                                        <TableCell
                                            className={`hover:bg-[#F1F5F9] !w-8  ${
                                                row.id === selectedRowId ? "!bg-[#F1F5F9]" : ""
                                            }  `}
                                            key={cell.id}
                                            style={{
                                                position: idx < 1 ? "sticky" : "relative",
                                                left: idx < 1 ? "29px" : "auto",
                                                zIndex: idx < 1 ? 1 : 0,
                                                backgroundColor: idx < 1 ? "white" : "",
                                                width: "19px",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
