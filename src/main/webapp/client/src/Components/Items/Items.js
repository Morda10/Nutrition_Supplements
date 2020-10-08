import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "./Item";
import { AddItem } from "./AddItem";
import { setItems, setWishes, setCart } from "../../redux/reducers/UserReducer";

export const Items = () => {
  const token = useSelector((state) => state.token);
  const userDetails = useSelector((state) => state.userDetails);
  const items = useSelector((state) => state.items);
  const presentedItems = useSelector((state) => state.presentedItems);
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);
  const noItems = useSelector((state) => state.noItems);
  const isAdmin = useSelector((state) => state.isAdmin);
  const [item, setitem] = useState(undefined);
  const dispatch = useDispatch();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchUserdata = async () => {
    try {
      if (items.length === 0) {
        const res = await axios.get("/items/getAllItems");
        // console.log(res);
        dispatch(setItems({ items: res.data }));
      }

      if (wishlist.length === 0) {
        const res1 = await axios.get(`/wishlist/getWishlist/${userDetails.id}`);
        const wishes = res1.data;
        dispatch(setWishes({ wishlist: wishes }));
      }
      console.log(cart.length);
      if (cart.length === 0) {
        const { data } = await axios.get(`cart/getCart/${userDetails.id}`);
        dispatch(setCart({ cart: data }));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateUserdata = async () => {
    try {
      const res = await axios.get("/items/getAllItems", config);
      // console.log(res);
      dispatch(setItems({ items: res.data }));

      const res1 = await axios.get(`/wishlist/getWishlist/${userDetails.id}`);
      const wishes = res1.data;
      dispatch(setWishes({ wishlist: wishes }));

      const { data } = await axios.get(`cart/getCart/${userDetails.id}`);
      dispatch(setCart({ cart: data }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // console.log("object1");
    fetchUserdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setWishes({ wishlist: wishlist }));
    dispatch(setItems({ items: items }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  return (
    <div>
      {item?.name}
      <Grid container justify="center" spacing={2}>
        {presentedItems
          ? presentedItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                setitem={setitem}
                updateUserdata={updateUserdata}
                config={config}
                userDetails={userDetails}
              />
            ))
          : null}
      </Grid>
      {noItems ? (
        <Typography
          align="center"
          style={{ color: "rgb(155 ,150 ,151 )" }}
          variant="h2"
        >
          No Items
        </Typography>
      ) : null}
      {isAdmin ? (
        <AddItem updateUserdata={updateUserdata} config={config} />
      ) : null}
    </div>
  );
};
