import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { Button, Grid, Typography } from "@material-ui/core";
import { setCart } from "../../redux/reducers/UserReducer";
import { CartItem } from "./CartItem";

export const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [itemsForPurchase, setitemsForPurchase] = useState([])

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

  const handleClick = () => {

    if(itemsForPurchase.length === 0) return 0;
    
    console.log(itemsForPurchase)
    const addhistory = async (values)=>{
     const res = await Axios.post("/history/addHistory/",values)
     console.log(res)
    }

    let a;
    itemsForPurchase.forEach(e => {

      for (let i = 0; i < cart.length; i++) {
        const el = cart[i];
        console.log(el.item.id)
        if(el.item.id === e) {
          a = el.amount
        break;
        }
        
      }

      // add check for amount of item if smaller throw error
      const values = {
        userId: userDetails.id,
        itemId: e,
        amount: a  
      }

      addhistory(values)
      
    });

    // remove purchased items from cart

    // update items amount
  }

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        style={{ fontWeight: "bold", margin: "2rem" }}
      >
       Shopping Cart
      </Typography>
      <Grid
       container
         spacing={2}
         justify="center"
      
       > 
        {cart
          ? cart.map((c) => (
              <CartItem
                key={c.item.id}
                item={c.item}
                amount={c.amount}
                removeItem={removeItem}
                itemsForPurchase={itemsForPurchase}
                setitemsForPurchase={setitemsForPurchase}
              />
              ))
              : null}
        </Grid> 

         <Button onClick={()=>{handleClick()}} variant="contained" color="primary" style={{fontWeight: "bold", left: "45%", margin: "2rem"}}>Place order</Button>
        

    </>
  );
};
