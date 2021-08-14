import "./App.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Sidebar from "./components/sidebar";
import SearchSamples from "./pages/search_samples";
import RegisterSamples from "./pages/register_samples";
import LinkSamples from "./pages/link_samples";
import Home from "./pages/home";
import { ROUTES } from "./consts";

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
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <Router>
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
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
