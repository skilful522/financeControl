import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';

import Box from "@material-ui/core/Box";

import { resetUserAction } from '../../slices/userSlice';
import { selectUser } from '../../selectors/selectUser';

import Menu from "../Menu";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = useCallback(() => dispatch(resetUserAction()), []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box mr={2}>
          <Menu />
        </Box>
        <Grid>MyMealsControl</Grid>
        <Grid container alignItems="center" justify="flex-end">
          <Grid item >
            {user.name} {user.surname}
          </Grid>
          <Box ml={2}>
            <ExitToAppIcon onClick={handleLogout} />
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
