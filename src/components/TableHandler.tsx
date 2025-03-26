import {
  BrowserNotSupportedOutlined,
  CheckBox,
  DeleteForever,
  Edit,
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
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { ModalActions } from "../utils/common.types";

interface TableHandlerProps {
  data: any[];
  columns: any[];
  rowKey: string;
  className?: string;
  isLoading: boolean;
  onAction: (actionType: ModalActions, row: any) => void;
}

const TableHandler: React.FC<TableHandlerProps> = ({
  data,
  columns,
  rowKey,
  className,
  isLoading,
  onAction,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
              <TableCell>Acciones</TableCell>
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
                      <Tooltip title="Ver">
                        <IconButton
                          onClick={() => onAction(ModalActions.VIEW, row)}
                        >
                          <Visibility className="text-blue-700 hover:text-blue-800" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() => onAction(ModalActions.EDIT, row)}
                        >
                          <Edit className="text-orange-600 hover:text-orange-700" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Eliminar">
                        <IconButton
                          onClick={() => onAction(ModalActions.DELETE, row)}
                        >
                          <DeleteForever className="text-red-700 hover:text-red-800" />
                        </IconButton>
                      </Tooltip>
                      {row.enable ? (
                        <Tooltip title="Desactivar">
                          <IconButton
                            onClick={() => onAction(ModalActions.DISABLE, row)}
                          >
                            <BrowserNotSupportedOutlined />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activar">
                          <IconButton
                            onClick={() => onAction(ModalActions.ENABLE, row)}
                          >
                            <CheckBox className="text-green-700 hover:text-green-800" />
                          </IconButton>
                        </Tooltip>
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
