import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Paper,
  List,
  ListItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";

/**
 * Dashboard sem conteúdo carregado
 */
const DashboardSkeleton: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Skeleton width={200} height={35} />

          {/* Cards de estatísticas */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 2,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} elevation={2}>
                <CardContent>
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="40%" height={30} />
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "340px 1fr" },
              gap: 2,
            }}
          >
            {/* Próximas consultas (lado esquerdo) */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Skeleton width={180} height={30} sx={{ mb: 2 }} />
              <List>
                {[1, 2, 3].map((i) => (
                  <ListItem key={i}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ mr: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton width="70%" height={20} />
                      <Skeleton width="40%" height={18} />
                    </Box>
                    <Skeleton variant="rounded" width={70} height={25} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Pacientes recentes (lado direito) */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Skeleton width={200} height={30} sx={{ mb: 2 }} />
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Skeleton width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton width={50} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={120} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardSkeleton;
