import React from 'react';
import { Menu as MenuMui } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";

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
        <MenuItem onClick={handleClose}>
          <Link href="/" >Личные продукты</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/products">Общие продукты</Link>
        </MenuItem>
      </MenuMui>
    </>
  );
};

export default Menu;
