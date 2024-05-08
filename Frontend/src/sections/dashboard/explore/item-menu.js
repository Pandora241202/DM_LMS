import PropTypes from 'prop-types';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import { Menu, MenuItem, menuItemClasses, SvgIcon } from '@mui/material';
import { paths } from '../../../paths';
import NextLink from 'next/link';



export const ItemMenu = (props) => {
  const { anchorEl, onClose, onDelete, open = false, idLesson } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      sx={{
        [`& .${menuItemClasses.root}`]: {
          fontSize: 14,
          '& svg': {
            mr: 1
          }
        }
      }}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
    >
      <MenuItem 
        onClick={onClose}
        component={NextLink}
        href={`${paths.dashboard.explore}/LM_Create/${idLesson}`}
        >
        <SvgIcon fontSize="small">
          <PlusIcon />
        </SvgIcon>
        Tạo tài liệu học mới
      </MenuItem>
      {/* <MenuItem
        onClick={onDelete}
        sx={{ color: 'error.main' }}
      >
        <SvgIcon fontSize="small">
          <Trash02Icon />
        </SvgIcon>
        Delete
      </MenuItem> */}
    </Menu>
  );
};

ItemMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
};
