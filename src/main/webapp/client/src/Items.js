import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardActions,
  Grid,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Formik, Form } from "formik";
import MyTextField from "./Input";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("User name is required"),
  cost: Yup.number()
    .min(0, "Cost can't be under 0")
    .required("cost is required"),
  inStock: Yup.number()
    .min(0, "inStock can't be under 0")
    .required("inStock is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 200,
    height: 50,
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
}));

export const Items = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const userDetails = useSelector((state) => state.userDetails);
  const [items, setitems] = useState([]);
  const [item, setitem] = useState(undefined);
  const [image, setimage] = useState(undefined);
  const [preview, setpreview] = useState(undefined);
  const [addingItem, setaddingItem] = useState(false);
  const [wishlist, setwishlist] = useState([]);
  const noItemImage =
    "https://res.cloudinary.com/itemsrestcloud/image/upload/v1596906678/none_kqgfrl.png";

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const f = async () => {
    try {
      const res = await axios.get("/api/items/", config);
      setitems(res.data);
      const res1 = await axios.get(`/api/user/getWishlist/${userDetails.id}`);
      const wishes = res1.data;
      console.log(wishes);
      console.log(userDetails.id);
      setwishlist(wishes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(userDetails);
    f();
  }, []);

  function handleChange(e) {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
      setpreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setpreview(null);
    }
  }

  const deleteItem = async (item) => {
    // console.log(item);
    // delete image from cloud
    if (item.imageId) {
      const res1 = await axios.delete(`api/image/${item.imageId}`, config);
      console.log(res1);
    }

    // delete item from DB
    const res2 = await axios.delete(`api/items/${item.id}`, config);
    console.log(res2);
    f();
  };

  const handleWishlist = async (e, item) => {
    e.target.style.color === "red"
      ? (e.target.style.color = "rgba(0, 0, 0, 0.54)")
      : (e.target.style.color = "red");
    try {
      if (e.target.style.color === "red") {
        setaddingItem(true);
        const res = await axios.post("/api/user/addToWishlist", {
          userId: userDetails.id,
          itemId: item.id,
        });
        console.log(userDetails);
        console.log(res.data);
        setaddingItem(false);
      } else {
        setaddingItem(true);
        await axios.delete("/api/user/removeFromWishlist", {
          data: {
            userId: userDetails.id,
            itemId: item.id,
          },
        });
        setaddingItem(false);
        console.log(userDetails);
      }
    } catch (e) {
      console.log(userDetails);
      console.log(e.message);
    }
  };

  return (
    <div>
      {item?.name}
      <Grid container justify="flex-start" spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id}>
            <Card className={classes.root} onClick={() => setitem(item)}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.image ? item.image : noItemImage}
                  title="item pic"
                />
              </CardActionArea>
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Typography>
                <br />
                <Typography
                  style={{
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  {item.cost}$
                </Typography>
                <IconButton
                  style={{ padding: "1rem" }}
                  onClick={(e) => handleWishlist(e, item)}
                  disabled={addingItem}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  style={{ color: "rgb(228,13,13)", right: "-3.5rem" }}
                  onClick={() => deleteItem(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
              {/* <CardHeader
                variant="h1"
                title={item.name}
                subheader={item.cost}
                style={{
                  color: "orange",
                  fontWeight: "bold",
                }}
              /> */}
              {/* <CardActions disableSpacing>
                <IconButton
                  style={{ padding: "1.7rem" }}
                  onClick={(e) => {
                    e.target.style.color === "red"
                      ? (e.target.style.color = "rgba(0, 0, 0, 0.54)")
                      : (e.target.style.color = "red");
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  style={{ color: "red", right: "-2rem" }}
                  onClick={() => deleteItem(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions> */}
              {/* <CardContent>
                <Button onClick={() => deleteItem(item)}>Delete</Button>
              </CardContent> */}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justify="center">
        <Grid item>
          {/* <Button
            onClick={() => f()}
            variant="outlined"
            style={{ marginTop: "1rem" }}
            disabled={showButton}
          >
            Items
          </Button> */}
          <h2>Add new item</h2>
          <Formik
            initialValues={{
              name: "",
              cost: 0,
              inStock: 0,
              image: "",
              imageId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                const formData = new FormData();
                if (image !== undefined) {
                  formData.append("image", image);
                  const config = {
                    headers: {
                      "content-type": "multipart/form-data",
                    },
                  };

                  const res = await axios.post("/api/image/", formData, config);
                  console.log(res.data);
                  values.image = res.data[0];
                  values.imageId = res.data[1];
                }
                if (values.name.length === 0) values.name = "No name";
                console.log(values);
                const address = await axios.post("/api/items", values, config);
                console.log(address);
                f();
                // await axios.post("/api/items/", values);

                return;
              } catch (e) {
                console.log(e);
              } finally {
                actions.resetForm();
                setpreview(null);
                setimage(null);
              }
            }}
          >
            {(values, isSubmitting) => (
              <Form>
                <MyTextField name="name" type="text" label="Name " />
                <br />
                <MyTextField name="cost" type="number" label="Cost " />
                <br />
                <MyTextField name="inStock" type="number" label="InStock " />
                <br />
                <MyTextField
                  name="imageFile"
                  type="file"
                  label="imageFile "
                  onChange={(e) => handleChange(e)}
                />
                {preview ? (
                  <img
                    width="200"
                    height="200"
                    src={preview}
                    alt="preview"
                  ></img>
                ) : null}

                <br />

                <Button
                  className={classes.button}
                  variant="contained"
                  // fullWidth
                  disabled={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};
