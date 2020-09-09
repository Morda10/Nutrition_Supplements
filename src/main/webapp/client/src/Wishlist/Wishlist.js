import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Wish } from "./Wish";
// import { setWishes, setItems } from "../redux/actions/authActions";
import { setWishes, setItems } from "../redux/reducers/UserReducer";
import axios from "axios";

export const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const token = useSelector((state) => state.token);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const removeWish = (wish) => {
    const tmp = wishlist.filter((w) => w.id !== wish.id);
    console.log(tmp);
    dispatch(setWishes({ wishlist: tmp }));
    // dispatch(setWishes(tmp));

    const handleWishlist = async (wish) => {
      try {
        await axios.delete("/api/user/removeFromWishlist", {
          data: {
            userId: userDetails.id,
            itemId: wish.id,
          },
        });
        //   fetchUserdata();
      } catch (e) {
        console.log(e.message);
      }
    };
    handleWishlist(wish);
  };

  useEffect(() => {
    if (!wishlist) {
      console.log(wishlist);
      const fetchUserdata = async () => {
        try {
          const res = await axios.get("/api/items/", config);
          const res1 = await axios.get(
            `/api/user/getWishlist/${userDetails.id}`
          );
          const itemsData = res.data;
          const wishes = res1.data;
          dispatch(setItems({ items: itemsData }));
          dispatch(setWishes({ wishlist: wishes }));
        } catch (e) {
          console.log(e);
        }
      };
      fetchUserdata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        style={{ fontWeight: "bold", margin: "2rem" }}
      >
        Wishlist
      </Typography>
      <Grid container justify="center" spacing={2}>
        {wishlist
          ? wishlist.map((w) => (
              <Wish key={w.id} wish={w} removeWish={removeWish} />
            ))
          : null}
        {wishlist && wishlist.length === 0 ? (
          <Typography
            variant="h2"
            style={{
              fontFamily: "sans-serif",
              coloe: "rgb(155 ,150 ,151 )",
              opacity: "0.5",
            }}
          >
            No Item Wished
          </Typography>
        ) : null}
      </Grid>
    </>
  );
};
