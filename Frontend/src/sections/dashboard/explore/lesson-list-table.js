import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { FileIcon } from '../../../components/file-icon';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

// function createData(name, price) {
//   return {
//     name,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         type: "PDF",
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         type: "VIDEO"
//       },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }}>
                {row.history.map((historyRow) => (
                <Item
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 1,
                    }}
                >
                    <Stack spacing={2} direction="row" alignItems="center">
                        <FileIcon extension={historyRow.type} />
                        <Typography noWrap>{historyRow.date}</Typography>
                    </Stack>
                </Item>
                ))}
            </Box> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 10),
//   createData('Ice cream sandwich', 20),
//   createData('Eclair', 30),
//   createData('Cupcake', 40),
//   createData('Gingerbread', 50),
//   createData('Frozen yoghurtu', 10),
//   createData('Ice cream sandwichu', 20),
//   createData('Eclairu', 30),
//   createData('Cupcakeu', 40),
//   createData('Gingerbreadu', 50),
//   createData('Frozen yoghurtuu', 10),
//   createData('Ice cream sandwichuu', 20),
//   createData('Eclairuu', 30),
//   createData('Cupcakeuu', 40),
//   createData('Gingerbreaduu', 50),
// ];

export default function CollapsibleTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Danh sách bài học</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}