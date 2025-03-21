import {
  Delete,
  Edit,
  ToggleOff,
  ToggleOn,
  Visibility,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";

interface TableHandlerProps {
  data: any[];
  columns: any[];
  rowKey: string;
  className?: string;
  isLoading: boolean;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onEnable?: (row: any) => void;
  onDisable?: (row: any) => void;
}

const TableHandler: React.FC<TableHandlerProps> = ({
  data,
  columns,
  rowKey,
  className,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onEnable,
  onDisable,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleAction = (action: (row: any) => void, row: any) => {
    action(row);
  };

  return (
    <Paper className={className} style={{ overflowX: "auto" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.title}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from(new Array(10)).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : data.map((row) => (
                  <TableRow hover key={row[rowKey]}>
                    {columns.map((column, index) => (
                      <TableCell key={index}>
                        {column.render
                          ? column.render(row[column.dataIndex])
                          : row[column.dataIndex]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => onView && handleAction(onView, row)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => onEdit && handleAction(onEdit, row)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete && handleAction(onDelete, row)}
                      >
                        <Delete />
                      </IconButton>
                      {row.isEnabled ? (
                        <IconButton
                          onClick={() =>
                            onDisable && handleAction(onDisable, row)
                          }
                        >
                          <ToggleOff />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() =>
                            onEnable && handleAction(onEnable, row)
                          }
                        >
                          <ToggleOn />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 100]}
        count={data.length}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default TableHandler;
