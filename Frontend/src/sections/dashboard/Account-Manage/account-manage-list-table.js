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
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

export const AccountManageListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
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
              <TableCell />
              <TableCell width="25%">
                Name
              </TableCell>
              <TableCell width="25%">
                Email
              </TableCell>
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
              <TableCell>
                Signed Up
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const isCurrent = product.id === currentProduct;
              const price = numeral(product.price).format(`${product.currency}0,0.00`);
              const quantityColor = product.quantity >= 10 ? 'success' : 'error';
              const statusColor = product.status === 'published' ? 'success' : 'info';
              const hasManyVariants = product.variants > 1;
              // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

              return (
                <Fragment key={product.id}>
                  <TableRow
                    hover
                    key={product.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
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
                        })
                      }}
                      width="25%"
                    >
                      {/* <IconButton onClick={() => handleProductToggle(product.id)}>
                        <SvgIcon>
                          {isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}
                        </SvgIcon>
                      </IconButton> */}
                      <Checkbox 
                        key = {product.id}
                        onChange = {handleToggle}
                        checked = {state[product.id]}
                      />
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {product.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                backgroundImage: `url(${product.image})`,
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
                            {product.name}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            in {product.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell width="25%">
                      <LinearProgress
                        value={product.quantity}
                        variant="determinate"
                        color={quantityColor}
                        sx={{
                          height: 8,
                          width: 36
                        }}
                      />
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {product.quantity}
                        {' '}
                        in stock
                        {hasManyVariants && ` in ${product.variants} variants`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {price}
                    </TableCell>
                    <TableCell>
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusColor}>
                        {product.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
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
                                    defaultValue={product.name}
                                    fullWidth
                                    label="Product name"
                                    name="name"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={product.sku}
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
                                    defaultValue={product.category}
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
                                    defaultValue={product.id}
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
                                    defaultValue={product.price}
                                    fullWidth
                                    label="Old price"
                                    name="old-price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {product.currency}
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
                                    defaultValue={product.price}
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
                              Delete product
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
        count={productsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

AccountManageListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
