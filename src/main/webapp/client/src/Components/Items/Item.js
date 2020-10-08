import React, { useEffect } from "react";
import {
  IconButton,
  Card,
  Grid,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishes } from "../../redux/reducers/UserReducer";
import { ItemsModal } from "./ItemsModal";
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
  userFavorite: {
    // position: "relative",
    right: "-3.8rem",
    top: "1rem",
  },
}));

export const Item = ({
  item,
  setitem,
  config,
  userDetails,
  updateUserdata,
}) => {
  const classes = useStyles();
  const noItemImage =
    "https://res.cloudinary.com/itemsrestcloud/image/upload/v1596906678/none_kqgfrl.png";
  const [liked, setLiked] = useState(false);
  const [addingItem, setaddingItem] = useState(false);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);
  const history = useHistory();

  // popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const f = () => {
      // console.log(wishlist);
      wishlist.map((w) => {
        if (w.id === item.id) setLiked(true);
        return true;
      });
    };
    f();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  const handleWishlist = async (item) => {
    try {
      if (!liked) {
        setaddingItem(true);
        const res = await axios.post("/wishlist/addToWishlist", {
          userId: userDetails.id,
          itemId: item.id,
        });
        // console.log(userDetails);
        console.log(res.data);
        setaddingItem(false);
        setLiked(true);
      } else {
        setaddingItem(true);
        await axios.delete("/wishlist/removeFromWishlist", {
          data: {
            userId: userDetails.id,
            itemId: item.id,
          },
        });
        setaddingItem(false);
        // console.log(userDetails);
        setLiked(false);
      }
      const res = await axios.get(`/wishlist/getWishlist/${userDetails.id}`);
      const wishes = res.data;
      dispatch(setWishes({ wishlist: wishes }));
    } catch (e) {
      console.log(userDetails);
      console.log(e.message);
    }
  };

  const deleteItem = async (item) => {
    // console.log(item);
    // delete image from cloud
    if (item.imageId) {
      const res1 = await axios.delete(
        `items/image/deleteImageById/${item.imageId}`,
        config
      );
      console.log(res1);
    }

    // delete item from DB
    const res2 = await axios.delete(`items/deleteItemById/${item.id}`, config);
    console.log(res2);
    updateUserdata();
  };

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
      <Card raised className={classes.root}>
        <CardActionArea onClick={() => history.push(`/ItemPage/${item.id}`)}>
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
          <Checkbox
            className={isAdmin ? classes.userFavorite : null}
            checked={liked}
            icon={<FavoriteIcon style={{ color: "rgb(0,0,0,0.26)" }} />}
            checkedIcon={<FavoriteIcon style={{ color: "rgb(119,19,39)" }} />}
            onClick={() => handleWishlist(item)}
            disabled={addingItem}
          />

          {isAdmin ? (
            <IconButton
              style={{ color: "rgb(228,13,13)", right: "-5rem" }}
              onClick={() => deleteItem(item)}
              disabled={addingItem}
            >
              <DeleteIcon />
            </IconButton>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};
