import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function WithBackdrop(WrappedComponent) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggleBackdrop = () => {
    setOpen(!open);
  };

  return (
    <>
    <WrappedComponent toggleBackdrop={toggleBackdrop} />
      <Backdrop className={classes.backdrop} open={open} onClick={() => console.log("wee")}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
