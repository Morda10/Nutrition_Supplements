import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "./Item";
import { AddItem } from "./AddItem";
// import { setItems, setWishes } from "../redux/actions/authActions";
import { setItems, setWishes } from "../redux/reducers/UserReducer";

export const Items = () => {
  const token = useSelector((state) => state.token);
  const userDetails = useSelector((state) => state.userDetails);
  const items = useSelector((state) => state.items);
  const wishlist = useSelector((state) => state.wishlist);
  // const [items, setitems] = useState([]);
  const [item, setitem] = useState(undefined);
  // const [wishlist, setwishlist] = useState([]);
  // const [wishlistId, setwishlistId] = useState([]);
  const dispatch = useDispatch();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchUserdata = async () => {
    try {
      console.log(items);
      // if (items === null) {
      const res = await axios.get("/api/items/", config);
      dispatch(setItems({ items: res.data }));
      // }
      // if (!wishlist) {
      const res1 = await axios.get(`/api/user/getWishlist/${userDetails.id}`);
      const wishes = res1.data;
      dispatch(setWishes({ wishlist: wishes }));
      // }
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
    // console.log("object2");
    const tmp = [];
    wishlist.forEach((w) => {
      tmp.push(w.id);
    });
    dispatch(setWishes({ wishlist: wishlist }));
    dispatch(setItems({ items: items }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  return (
    <div>
      {item?.name}
      <Grid container justify="center" spacing={2}>
        {items
          ? items.map((item) => (
              <Item
                key={item.id}
                item={item}
                setitem={setitem}
                fetchUserdata={fetchUserdata}
                config={config}
                userDetails={userDetails}
              />
            ))
          : null}
      </Grid>

      <AddItem fetchUserdata={fetchUserdata} config={config} />
    </div>
  );
};
