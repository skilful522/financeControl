import React from 'react';
import { Menu as MenuMui } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

const Menu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuIcon onClick={handleClick} />
      <MenuMui
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
        <MenuItem onClick={handleClose}>Личные продукты</MenuItem>
        <MenuItem onClick={handleClose}>Общие продукты</MenuItem>
      </MenuMui>
    </>
  );
};

export default Menu;
