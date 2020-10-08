import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "./Item";
import { setItems } from "../../../redux/reducers/UserReducer";
import { useHistory } from "react-router-dom";

export const GuestItems = () => {
  const token = useSelector((state) => state.token);
  const userDetails = useSelector((state) => state.userDetails);
  const items = useSelector((state) => state.items);
  const presentedItems = useSelector((state) => state.presentedItems);
  const noItems = useSelector((state) => state.noItems);
  const [item, setitem] = useState(undefined);
  const dispatch = useDispatch();
  const history = useHistory();

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
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserdata = async () => {
    try {
      const res = await axios.get("/items/getAllItems");
      // console.log(res);
      dispatch(setItems({ items: res.data }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      history.push("/Home");
    }
    fetchUserdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
};
