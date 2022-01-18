import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hook';
import { useAddress, useWeb3Context } from '../hooks';

import './style.scss';
import { Hidden, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Calculator from 'src/views/Calculator';
import Dashboard from 'src/views/Dashboard/TreasuryDashboard';
import Migrate from 'src/views/Migrate';
import PearlChests from 'src/views/PearlChests';
import TopBar from '../components/Header';
import Loading from '../components/Loader';
import Sidebar from '../components/Sidebar';
import NavDrawer from '../components/Sidebar/NavDrawer';

import { BondKeys, zeroAddress } from '../constants';
import { batchGetBondDetails } from '../store/actions/bond-action';
import { listMyNFT, batchListBondNFTDiscounts } from 'src/store/actions/nft-action';
import { calculateUserBondDetails, loadAccountDetails } from '../store/slices/account-slice';
import { loadAppDetails } from '../store/slices/app-slice';
import { ChooseBond, Stake, Wrap } from '../views';
import NotFound from '../views/404/NotFound';
import './style.scss';

const drawerWidth = 280;
const transitionDuration = 969;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    height: '100%',
    overflow: 'auto',
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallerScreen = useMediaQuery('(max-width: 960px)');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const {
    address: walletAddress,
    chainID,
    provider,
    connected,
    readOnlyProvider,
    connect,
    hasCachedProvider,
  } = useWeb3Context();
  const address = useAddress();

  const [walletChecked, setWalletChecked] = useState(false);

  const isAppLoading = useAppSelector(state => state.app.loading);
  const isBondLoading = useAppSelector(state => state.bonding.loading);
  const isAppLoaded = useAppSelector(state => typeof state.app.marketPrice != 'undefined');

  async function loadDetails(whichDetails: string) {
    let loadProvider = readOnlyProvider;

    if (whichDetails === 'app') {
      loadApp(loadProvider);
      // loadTerms(loadProvider);
    }

    if (whichDetails === 'account' && address && connected) {
      loadAccount(loadProvider);
      // loadTerms(loadProvider);
      if (isAppLoaded) return;

      loadApp(loadProvider);
    }

    if (whichDetails === 'userBonds' && address && connected) {
      Object.values(BondKeys).map(async bondKey => {
        await dispatch(calculateUserBondDetails({ address, bondKey, provider, networkID: chainID }));
      });
    }
  }

  const loadApp = useCallback(
    loadProvider => {
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
      dispatch(
        batchGetBondDetails({
          wallet: address,
          value: null,
          provider: loadProvider,
          networkID: chainID,
          userBalance: '0',
          nftAddress: zeroAddress,
          tokenId: 0,
        }),
      );
      dispatch(batchListBondNFTDiscounts({ provider, networkID: chainID }));
      dispatch(listMyNFT({ provider, wallet: walletAddress, networkID: chainID }));
    },
    [connected],
  );

  const loadAccount = useCallback(
    loadProvider => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
    },
    [connected],
  );

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);

  useEffect(() => {
    if (walletChecked) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
    }
  }, [walletChecked]);

  useEffect(() => {
    if (connected) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
    }
  }, [connected]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarExpanded(false);
  };

  useEffect(() => {
    if (isSidebarExpanded) handleSidebarClose();
  }, [location]);

  if (isAppLoading || isBondLoading) return <Loading />;

  return (
    <>
      <div className={`app ${isSmallerScreen && 'tablet'} ${isSmallScreen && 'mobile'}`}>
        <TopBar drawe={!isSmallerScreen} handleDrawerToggle={handleDrawerToggle} />
        <nav className={classes.drawer}>
          <Hidden mdUp>
            <NavDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          </Hidden>
          <Hidden smDown>
            <Sidebar />
          </Hidden>
        </nav>

        <div className={`${classes.content} ${isSmallerScreen && classes.contentShift}`}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/stake">
              <Stake />
            </Route>

            <Route path="/wrap">
              <Wrap />
            </Route>

            <Route path="/pearl-chests">
              <PearlChests />
            </Route>

            <Route path="/bonds">
              <ChooseBond />
            </Route>

            <Route path="/migrate">
              <Migrate />
            </Route>

            <Route path="/calculator">
              <Calculator />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
