import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";

export type Column<Object> = {
  id: keyof Object;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center" | "inherit" | "justify";
  format?: (value: any, row: Object) => React.ReactNode;
};

type Props<Object> = {
  columns: readonly Column<Object>[];
  rows: Object[];
  getRowId: (row: Object) => string | number;
};

function DefaultTable<Object>({ columns, rows, getRowId }: Props<Object>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={getRowId(row)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={String(column.id)} align={column.align}>
                        {column.format
                          ? column.format(value, row)
                          : String(value ?? "")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}

export default DefaultTable;
