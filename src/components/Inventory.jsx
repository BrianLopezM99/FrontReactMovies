import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Swal from "sweetalert2";

const columns = [
  { id: "id_film", label: "id_film", minWidth: 170 },
  { id: "id_inventario", label: "id_inventario", minWidth: 170 },
  { id: "Titulo", label: "Titulo", minWidth: 100 },
  {
    id: "Calificacion",
    label: "Calificacion",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("es-MX"),
  },
  {
    id: "fecha de publicacion",
    label: "fecha de publicacion",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("es-MX"),
  },
  {
    id: "Mas opciones",
    label: "Mas opciones",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("es-MX"),
  },
];

const Inventory = ({ data3 }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const data = data3.inventory;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    Swal.fire({
      title: `Formulario de edicion ${id}`,
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Titulo">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Calificacion">' ,
        // '<input type="date" id="swal-input3" class="swal2-input" placeholder="Fecha de publicaion">',
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-input1").value;
        const rate = document.getElementById("swal-input2").value;
        // const date = document.getElementById("swal-input3").value;
        if (!title || !rate) {
          Swal.showValidationMessage("Por favor, completa todos los campos");
        }
        return { title: title, rate: rate };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, rate } = result.value;
        // Hacer algo con los datos ingresados
        fetch(`http://localhost:5000/api/film/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, rate}),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Película actualizada con éxito");
            } else {
              console.log("Error al actualizar la película");
            }
          })
          .catch((error) => console.error(error));
        console.log(title, rate);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/inventory/${id}`, {
          method: "DELETE",
        }).then(() => {
          Swal.fire(
            "Eliminado!",
            "Pelicula eliminada satisfactoriamente",
            "success"
          );
          fetch("http://localhost:5000/api/inventory");
          console.log("ID OBTENIDO", id);
        });
      }
    });
  };


  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );

  }

  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={data.inventory_id}
                  >
                    <TableCell>{data.film_id}</TableCell>
                    <TableCell align="left">{data.inventory_id}</TableCell>
                    <TableCell align="left">{data.title}</TableCell>
                    <TableCell align="right">{data.rental_rate}</TableCell>
                    <TableCell align="right" style={{ marginRight: "10px" }}>
                      {data.release_year}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(data.inventory_id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(data.inventory_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
};

export default Inventory;
