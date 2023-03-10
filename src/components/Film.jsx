import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Film = ({data}) => {
  return (
    <TableContainer>
      <h1 style={{ color: "black" }}>Top 5 films</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Top</TableCell>
            <TableCell align="right">No de rentas</TableCell>
            <TableCell align="right">Titulo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((film, i) => (
            <TableRow
              key={film.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">{film.total_rentals}</TableCell>
              <TableCell align="right">{film.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Film;
