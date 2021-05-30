import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import { resetUserAction } from '../../slices/userSlice';
import { selectUser } from '../../selectors/selectUser';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = useCallback(() => dispatch(resetUserAction()), []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid>MyFinanceControl</Grid>
        <Grid container spacing={4} justify="flex-end">
          <Grid item>
            {user.name} {user.surname}
          </Grid>
          <Grid item>
            <ExitToAppIcon onClick={handleLogout} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
