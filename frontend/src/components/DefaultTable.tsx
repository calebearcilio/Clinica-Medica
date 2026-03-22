import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
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
  isLoading?: boolean;
};

/**
 * Loyaut de uma tabela padronizada
 *
 * Para usar defina uma variárel do tipo Column
 * @param columns formatação das colunas e cabeçalho
 * @param rows informações das linhas
 * @param getRowId função para retornar um identificador
 * @param isLoading opcional, controle de carregamento
 */
function DefaultTable<Object>({
  columns,
  rows,
  getRowId,
  isLoading = false,
}: Props<Object>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const skeletonRows = Array.from(new Array(5));

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="tabela padronizada">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="body1">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <TableRow key={`skeleton-row-${index}`}>
                    {columns.map((column) => (
                      <TableCell key={`skeleton-cell-${String(column.id)}`}>
                        <Skeleton variant="text" animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={getRowId(row)}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={String(column.id)}
                            align={column.align}
                          >
                            <Typography variant="subtitle1">
                              {column.format
                                ? column.format(value, row)
                                : String(value ?? "")}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!isLoading && (
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
      )}
    </Paper>
  );
}

export default DefaultTable;
