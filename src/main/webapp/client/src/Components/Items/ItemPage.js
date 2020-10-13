import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setCart } from "../../redux/reducers/UserReducer";
import { ItemComments } from "./ItemComments";

export const ItemPage = () => {
  let { itemId } = useParams();
  const noItemImage = useSelector((state) => state.noItemImage);
  const [item, setitem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.user);
  const [disableButton, setDisableButton] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get(`/items/getItemById/${itemId}`);
      console.log(res);
      setitem(res.data);
    };
    try {
      fetchItem();
    } catch (e) {
      console.log(e);
    }
  }, [itemId]);

  const addToCart = async () => {
    if (!user) history.push("/Login");
    else {
      const values = {
        userId: userDetails.id,
        itemId: itemId,
        amount: amount,
      };
      try {
        const res = await axios.post("/cart/addToCart", values);
        console.log(res);

        const { data } = await axios.get(`/cart/getCart/${userDetails.id}`);
        dispatch(setCart({ cart: data }));
      } catch (e) {
        setErrors([...errors, e.response.data]);
      }
    }
  };

  const handleAmount = (e) => {
    const val = e.target.value;
    if (val > item.inStock || val < 1) return 0;
    else setAmount(val);
  };

  useEffect(() => {
    if (errors.length !== 0) setDisableButton(true);
  }, [errors]);

  return (
    <>
      {item ? (
        <Grid container>
          <Grid item xs={12} sm={6}>
            <img
              src={item.image ? item.image : noItemImage}
              alt="main"
              width="380"
              height="380"
              style={{ borderRadius: "5%", marginLeft: "1rem" }}
            ></img>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {item.name} -
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  item description -
                </Typography>
                <Typography variant="subtitle2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris efficitur orci et mollis fringilla. Cras non ligula non
                  ante facilisis fringilla. Vestibulum aliquam urna ut sem
                  convallis, quis luctus purus semper. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus. Sed finibus lorem eu
                  finibus cursus. Pellentesque elementum tellus et augue luctus
                  accumsan. Sed non eleifend nisl. Integer commodo dui vel
                  finibus consequat. Integer in ultricies diam. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames
                  ac turpis egestas. Nulla dictum a felis at bibendum. In
                  auctor, neque ut imperdiet finibus, mauris quam scelerisque
                </Typography>

                <Typography style={{ marginTop: "1rem" }}>
                  in stock: {item.inStock}
                </Typography>

                <Box style={{ marginTop: "1rem" }}>
                  <TextField
                    label="amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{
                      width: "4rem",
                      marginRight: "1rem",
                    }}
                    value={amount}
                    onChange={(e) => handleAmount(e)}
                    min="1"
                  />

                  <Typography
                    style={{ display: "inline-block", marginRight: "1rem" }}
                  >
                    <b>{item.cost * amount} $ US</b>
                  </Typography>

                  <Button
                    color="primary"
                    variant="contained"
                    disabled={disableButton}
                    onClick={() => addToCart()}
                  >
                    Add to cart
                  </Button>
                </Box>
                {errors.length !== 0
                  ? errors.map((e, i) => (
                      <Typography
                        key={i}
                        variant="subtitle1"
                        color="error"
                        style={{ left: "10rem" }}
                      >
                        <b>{e}</b>
                      </Typography>
                    ))
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      <hr
        style={{
          marginTop: "2rem",
          height: "2px",
          width: "90%",
          borderWidth: 0,
          color: "gray",
          backgroundColor: "gray",
        }}
      />

      <ItemComments item={item} />
    </>
  );
};
