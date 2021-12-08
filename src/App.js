import "./App.css";
import React from "react";
import { SnackbarProvider } from "notistack";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Sidebar from "./components/sidebar";
import SearchSamples from "./pages/search_samples";
import RegisterSamples from "./pages/register_samples";
import LinkSamples from "./pages/link_samples";
import Login from "./pages/login";
import Home from "./pages/home";
import { ROUTES } from "./consts";
import { login, userIsLogged } from "./utils";

const useStyles = makeStyles((theme) => ({
  containerSpace: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
}));

function App() {
  const classes = useStyles();
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    async function logUser() {
      const isUserLogged = await userIsLogged();
      setIsLogged(isUserLogged);
    }
    logUser();
    // eslint-disable-next-line
  }, []);

  async function tryToLog(user, password) {
    const { isLogged } = await login(user, password);
    setIsLogged(isLogged);
  }

  function showLogin() {
    return (
      <Switch>
        <Route exact path={ROUTES.login}>
          <Login onLogin={(user, password) => tryToLog(user, password)} />
        </Route>
      </Switch>
    );
  }

  function showLoggedArea() {
    return (
      <Grid container className={classes.root}>
        <Grid item sm={2} className={classes.sidebar}>
          <Sidebar />
        </Grid>
        <Grid item sm={10} className={classes.content}>
          <Container className={classes.containerSpace}>
            <Switch>
              <Route exact path={ROUTES.home}>
                <Home />
              </Route>
              <Route exact path={ROUTES.searchSamples}>
                <SearchSamples />
              </Route>
              <Route exact path={ROUTES.linkSamples}>
                <LinkSamples />
              </Route>
              <Route exact path={ROUTES.registerSamples}>
                <RegisterSamples />
              </Route>
            </Switch>
          </Container>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <Router basename={ROUTES.base}>
          {isLogged ? (
            <Redirect to={ROUTES.home} />
          ) : (
            <Redirect to={ROUTES.login} />
          )}
          {isLogged ? showLoggedArea() : showLogin()}
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
