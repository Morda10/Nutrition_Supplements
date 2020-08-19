import React, { useState } from "react";
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
  CardContent,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Formik, Form } from "formik";
import MyTextField from "./Input";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 200,
    height: 50,
    // height: 0,
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
}));

export const Items = () => {
  const classes = useStyles();
  // const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [items, setitems] = useState([]);
  const [item, setitem] = useState(undefined);
  const [image, setimage] = useState(undefined);
  const [preview, setpreview] = useState(undefined);
  const noItemImage =
    "https://res.cloudinary.com/itemsrestcloud/image/upload/v1596906678/none_kqgfrl.png";

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const f = async () => {
    try {
      // console.log(token);
      const res = await axios.get("/api/items/", config);
      // console.log(res);
      setitems(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  function handleChange(e) {
    setimage(e.target.files[0]);
    setpreview(URL.createObjectURL(e.target.files[0]));
  }

  const deleteItem = async (item) => {
    // console.log(item);
    // delete image from cloud
    if (item.imageId) {
      const res1 = await axios.delete(`api/image/${item.imageId}`, config);
      // console.log(res1);
    }

    // delete item from DB
    const res2 = await axios.delete(`api/items/${item.id}`, config);
    // console.log(res2);
    f();
  };
  return (
    <div>
      <h1 className={classes.title}>Nutrition Express</h1>
      {item ? item.name : null}
      <Grid container justify="flex-start" spacing={1}>
        {items.map((item) => (
          <Grid item key={item.id}>
            <Card className={classes.root} onClick={() => setitem(item)}>
              <CardHeader
                title={item.name}
                subheader={item.cost}
                style={{ color: "orange", fontWeight: "bold" }}
              />
              <CardMedia
                className={classes.media}
                image={item.image ? item.image : noItemImage}
                title="item pic"
              />

              <CardActions disableSpacing>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </CardActions>
              <CardContent>
                <Button onClick={() => deleteItem(item)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justify="center">
        <Grid item>
          <Button onClick={() => f()} variant="outlined">
            Items
          </Button>
          <h2>Add new item</h2>
          <Formik
            initialValues={{
              name: "",
              cost: 0,
              inStock: 0,
              image: "",
              imageId: "",
            }}
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

                console.log(values);
                const addres = await axios.post("/api/items", values, config);
                console.log(addres);
                f();
                // await axios.post("/api/items/", values);

                return;
              } catch (e) {
                console.log(e);
              }
              actions.resetForm();
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
