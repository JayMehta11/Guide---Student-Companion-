import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 255;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: "100vw",
      overflowX: "hidden"
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      
    },
    menuButton: {
      
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflowX: "hidden"
    },
  }));

  export {useStyles};