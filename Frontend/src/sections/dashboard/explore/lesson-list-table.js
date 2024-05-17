import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    Divider,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip,
    Typography
  } from '@mui/material';
import { FileIcon } from '../../../components/file-icon';
import { styled } from '@mui/material/styles';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useMounted } from '../../../hooks/use-mounted';
import { exploreApi } from '../../../api/explore';
import { fileApi } from '../../../api/file';
import { ItemMenu } from './item-menu';




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
  const courseUrl = window.location.href.split('/');
  const courseId = (courseUrl[courseUrl.length - 1]);
  const isMounted = useMounted();
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { row, accountType } = props;
  const [open, setOpen] = React.useState(false);
  const [listLMAccordingToLesson, setListLMAccordingToLesson] = useState({
    "title": "",
    "learningMaterial": [
        {
            "id": 9,
            "name": "Document21"
        }
    ],
    "amountOfTime": 0,
    "visibility": true,
    "courseId": 1
});
  const [fileGet, setFileGet] = useState("")
  const getLesson = useCallback(async (id) => {
    try {
      const response = await exploreApi.getLesson(id);

      if (isMounted()) {
        setListLMAccordingToLesson(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [open])

  const getFile = useCallback(async (id) => {
    try {
      // const response = await fileApi.getFileFromGGDrive(id);

      if (isMounted()) {
        // console.log(response.data)
        // setFileGet(response.data.url);
        window.open(`http://localhost:8080/learning-materials/${id}`, '_blank');
        // console.log(fileGet)
      }
    } catch (err) {
      console.error(err);
    }
  }, [open])

  const handleMenuClose = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleMenuOpen = useCallback(() => {
    setOpenMenu(true);
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {setOpen(!open)
                            getLesson(row.id)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        {
          accountType !== "LEARNER" && 
          <TableCell align="right">
              <IconButton
                  onClick={handleMenuOpen}
                  ref={menuRef}
              >
                <SvgIcon fontSize="small">
                    <DotsVerticalIcon />
                </SvgIcon>
              </IconButton>
          </TableCell>
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
                {listLMAccordingToLesson.learningMaterial.map((_lm) => (
                <Item
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 1,
                    }}
                    onClick={() => getFile(_lm.id)}
                >
                    <Stack spacing={2} direction="row" alignItems="center">
                        <FileIcon extension={_lm.type} />
                        <Typography noWrap>{_lm.name}</Typography>
                    </Stack>
                </Item>
                ))}
            </Box>
            {console.log(listLMAccordingToLesson["learningMaterial"])}
          </Collapse>
        </TableCell>
      </TableRow>
      {accountType !== "LEARNER" && <ItemMenu
        anchorEl={menuRef.current}
        onClose={handleMenuClose}
        open={openMenu}
        idLesson={row.id}
        idCourse={courseId}
      />}
    </React.Fragment>
  );
}

Row.propTypes = {
  key: PropTypes.number,
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({accountType, rows}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Danh sách bài học</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} accountType={accountType}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}