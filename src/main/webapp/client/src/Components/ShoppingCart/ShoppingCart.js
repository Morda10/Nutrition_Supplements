import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { setCart } from "../../redux/reducers/UserReducer";
import { CartItem } from "./CartItem";

export const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cart.length);
    const fechCart = async () => {
      const { data } = await Axios.get(`cart/getCart/${userDetails.id}`);
      // console.log(data);
      dispatch(setCart({ cart: data }));
    };
    if (cart.length === 0) fechCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeItem = (item) => {
    const handleWishlist = async (item) => {
      try {
        await Axios.delete("/cart/removeFromCart", {
          data: {
            userId: userDetails.id,
            itemId: item.id,
          },
        });
        const tmp = cart.filter((w) => w.id.itemId !== item.id);
        console.log(tmp);
        dispatch(setCart({ cart: tmp }));
      } catch (e) {
        console.log(e.message);
      }
    };
    handleWishlist(item);
  };

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        style={{ fontWeight: "bold", margin: "2rem" }}
      >
        Cart
      </Typography>
      <Grid container justify="center" spacing={2}>
        {cart
          ? cart.map((c) => (
              <CartItem
                key={c.item.id}
                item={c.item}
                amount={c.amount}
                removeItem={removeItem}
              />
            ))
          : null}
      </Grid>
    </>
  );
};
