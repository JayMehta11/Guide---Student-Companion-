import React, { useContext, useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import './home.scss'
import { useStyles } from './MaterialStyles';
import PulseLoader from 'react-spinners/PulseLoader'

import { useTheme } from '@material-ui/core/styles';
import SideNavBar from './SideNavBar';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { cur, currentUser } from '../Services/AuthServices';
import { HomeContext } from '../Context/HomeContext';
import Todo from './Todos/Todo';
import {NavigationComponent,NavigationComponentAdmin} from '../Navigations'

function Home(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {navigator} = useContext(HomeContext)  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [user,setUser] = useState(currentUser.value)
    
    useEffect(() => {
    let AuthObservalble = currentUser.subscribe(data => setUser(data))

    return () => {
      AuthObservalble.unsubscribe();
    }
  },[])
  

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if(currentUser.value === null){
      window.location = "/"
    }
  },[])


  return (
      <div className={classes.root}>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, 
              }}
            >
              <SideNavBar></SideNavBar>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <SideNavBar></SideNavBar>
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className="w-100 mt-lg-5 mt-md-5 mt-4 pt-lg-3 pt-md-3 pt-4 main-container" id="main-container">
              {(user==="loading" || user===null) ? <div className="w-100 mt-4 text-center"><PulseLoader size={15} margin={2} color="#36D7B7" /></div> : <>{user.isAdmin ? NavigationComponentAdmin[navigator] : NavigationComponent[navigator]} </>}
          </div>
        </main>
      </div>
  );
}

export default Home;