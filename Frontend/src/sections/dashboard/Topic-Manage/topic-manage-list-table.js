import { Fragment, useCallback, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { SeverityPill } from '../../../components/severity-pill';

const categoryOptions = [
  {
    label: 'VIDEO',
    value: 'VIDEO'
  },
  {
    label: 'PDF',
    value: 'PDF'
  },
  {
    label: 'QUIZZ',
    value: 'QUIZZ'
  },
  {
    label: 'WORD',
    value: 'WORD'
  },
  {
    label: 'CODE',
    value: 'CODE'
  },
  {
    label: 'PPT',
    value: 'PPT'
  }
];

export const TopicManageListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    Topics,
    TopicsCount,
    rowsPerPage,
    ...other
  } = props;
  const [currentProduct, setCurrentProduct] = useState(null);
  const [state, setState] = useState(false);

  const handleProductToggle = useCallback((productId) => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null;
      }

      return productId;
    });
  }, []);

  const handleProductClose = useCallback(() => {
    setCurrentProduct(null);
  }, []);

  const handleProductUpdate = useCallback(() => {
    setCurrentProduct(null);
    toast.success('Product updated');
  }, []);

  const handleProductDelete = useCallback(() => {
    toast.error('Product cannot be deleted');
  }, []);

  const handleToggle = ({target}) => {
    setState(state => ({ ...state, [target.name]: !state[target.name] }));
  }

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell width="25%">
                ID
              </TableCell>
              <TableCell width="25%">
                Tên chủ đề 
              </TableCell>
              <TableCell align="right">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Topics.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage)
            .map((Topic) => {
              const isCurrent = Topic.id === currentProduct;
              // const price = numeral(Topic.price).format(`${Topic.currency}0,0.00`);
              // const quantityColor = Topic.quantity >= 10 ? 'success' : 'error';
              const statusColor = Topic.status === 'published' ? 'success' : 'info';
              const hasManyVariants = Topic.variants > 1;
              // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

              return (
                <Fragment key={Topic.id}>
                  <TableRow
                    hover
                    key={Topic.id}
                  >
                    <TableCell width="25%">
                      {/* <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {Topic.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                backgroundImage: `url(${Topic.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 80
                              }}
                            />
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                width: 80
                              }}
                            >
                              <SvgIcon>
                                <Image01Icon />
                              </SvgIcon>
                            </Box>
                          )}
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2
                          }}
                        >
                          <Typography variant="subtitle2">
                            {Topic.title}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            in {Topic.category}
                          </Typography>
                        </Box>
                      </Box> */}
                      {Topic.id}
                    </TableCell>
                    <TableCell>
                      {/* <SeverityPill color={statusColor}>
                        {Topic.status}
                      </SeverityPill
                      > */}
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        {/* {Topic.updatedAt ? new Date(Topic.updatedAt).toLocaleDateString('en-GB') : 'N/A'} */}
                        {Topic.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleProductToggle(Topic.id)}   >
                        <SvgIcon>
                          <DotsHorizontalIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Basic details
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={Topic.title}
                                    fullWidth
                                    label="Product title"
                                    name="title"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={Topic.sku}
                                    disabled
                                    fullWidth
                                    label="SKU"
                                    name="sku"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={Topic.category}
                                    fullWidth
                                    label="Category"
                                    select
                                  >
                                    {categoryOptions.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={Topic.id}
                                    disabled
                                    fullWidth
                                    label="Barcode"
                                    name="barcode"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Pricing and stocks
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={Topic.price}
                                    fullWidth
                                    label="Old price"
                                    name="old-price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {Topic.currency}
                                        </InputAdornment>
                                      )
                                    }}
                                    type="number"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={Topic.price}
                                    fullWidth
                                    label="New price"
                                    name="new-price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      )
                                    }}
                                    type="number"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Switch />
                                  <Typography variant="subtitle2">
                                    Keep selling when stock is empty
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ p: 2 }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Button
                              onClick={handleProductUpdate}
                              type="submit"
                              variant="contained"
                            >
                              Update
                            </Button>
                            <Button
                              color="inherit"
                              onClick={handleProductClose}
                            >
                              Cancel
                            </Button>
                          </Stack>
                          <div>
                            <Button
                              onClick={handleProductDelete}
                              color="error"
                            >
                              Delete Topic
                            </Button>
                          </div>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={TopicsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TopicManageListTable.propTypes = {
  Topics: PropTypes.array.isRequired,
  TopicsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
