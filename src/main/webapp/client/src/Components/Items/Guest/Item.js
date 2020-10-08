import React from "react";
import {
  Card,
  Grid,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { ItemsModal } from "../ItemsModal";
import { useHistory } from "react-router-dom";

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
    width: 200,
    height: 200,
  },
  red: {
    color: "red",
  },
  noRed: {
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

export const Item = ({ item }) => {
  const classes = useStyles();
  const noItemImage =
    "https://res.cloudinary.com/itemsrestcloud/image/upload/v1596906678/none_kqgfrl.png";
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid
      item
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <ItemsModal
        item={item}
        open={open}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
      />
      <Card
        raised
        className={classes.root}
        onClick={() => history.push(`/ItemPage/${item.id}`)}
      >
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
            {item.cost} $
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
