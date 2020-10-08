import React, { useState } from "react";
import MyTextField from "../../UI/Forms/Input";
import { Form, Formik } from "formik";
import { Grid, Button } from "@material-ui/core";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required"),
  cost: Yup.number()
    .min(0, "Cost can't be under 0")
    .required("cost is required"),
  inStock: Yup.number()
    .min(0, "inStock can't be under 0")
    .required("inStock is required"),
});

export const AddItem = ({ updateUserdata, config }) => {
  const [image, setimage] = useState(undefined);
  const [preview, setpreview] = useState(undefined);

  function handleChange(e) {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
      setpreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setpreview(null);
    }
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
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

                const res = await axios.post(
                  "items/image/addImage",
                  formData,
                  config
                );
                console.log(res.data);
                values.image = res.data[0];
                values.imageId = res.data[1];
              }
              if (values.name.length === 0) values.name = "No name";
              console.log(values);
              const address = await axios.post(
                "/items/addItem",
                values,
                config
              );
              console.log(address);
              updateUserdata();
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
                <img width="200" height="200" src={preview} alt="preview"></img>
              ) : null}

              <br />

              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
