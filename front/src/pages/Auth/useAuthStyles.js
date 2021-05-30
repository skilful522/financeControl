import { makeStyles } from '@material-ui/core';

import { colors } from '../../theme/colors';
import pageBg from '../../static/authPageBg.jpg';

export const useAuthStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundImage: `url(${pageBg})`,
    backgroundSize: 'cover',
    backgroundPositionY: '60%',
    backgroundPositionX: '40%',
  },
  form: {
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 320,
    },
  },
  formsWrapper: {
    paddingRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  },
  paper: {
    padding: '60px 75px 50px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    borderRadius: 8,
    maxWidth: 495,
    width: '100%',
    boxShadow: `0 10px 15px ${colors.boxShadow}`,
  },
}));
