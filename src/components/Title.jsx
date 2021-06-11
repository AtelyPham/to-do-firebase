import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/useStyles";

const Title = () => {
  const classes = useStyles();
  return (
    <Typography variant="h3" align="center" className={classes.mainTitle}>
      To do List
    </Typography>
  );
};

export default React.memo(Title);
