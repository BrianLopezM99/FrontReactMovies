import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";

const Customers = ({data2}) => {
    return ( 
        <TableContainer>
            {console.log(data2)}
        <h1 style={{ color: "black" }}>Top 5 films</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Top</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Total de rentas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((customer, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left">{customer.first_name}</TableCell>
                <TableCell align="right">{customer.last_name}</TableCell>
                <TableCell align="right">{customer.total_rentals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     );
}
 
export default Customers;