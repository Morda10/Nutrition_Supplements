import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: 15,
  },
  media: {
    width: 200,
    height: 200,
    // borderStyle: "ridge none ridge none",
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red[500]",
  },
  title: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  image: {
    width: 150,
    height: 200,
  },
  remove: {
    color: theme.palette.error.main,
    right: "-3.8rem",
    top: "1rem",
  },
}));

export const CartItem = ({ item, amount, removeItem }) => {
  const classes = useStyles();
  const noItemImage = useSelector((state) => state.noItemImage);

  return (
    <Grid item>
      <Card raised className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.image ? item.image : noItemImage}
            title="item pic"
          />
        </CardActionArea>
        <CardContent>
          <Typography
            style={{
              fontWeight: "bold",
            }}
            align="center"
          >
            {item.cost}$
          </Typography>
          <Typography
            style={{
              fontWeight: "bold",
            }}
            align="center"
          >
            amount: {amount}
          </Typography>
          <IconButton
            className={classes.remove}
            onClick={() => removeItem(item)}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};
