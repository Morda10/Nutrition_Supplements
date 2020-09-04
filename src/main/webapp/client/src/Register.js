import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import MyTextField from "./Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("userName is required"),
  //   email: Yup.string()
  //     .email("Email not valid")
  //     .required("Email is required"),
  password: Yup.string()
    .min(2, "Password must be 2 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(2, "Password must be 2 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
});

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  title: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "#202020",
    color: "white",
  },
});

const Register = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container justify="center" style={{ marginTop: "3em" }}>
      <Grid item xs={10} sm={8} lg={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography align="center" variant="h3">
              Register
            </Typography>
            <Formik
              initialValues={{
                // email: "",
                userName: "",
                password: "",
                repass: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  await axios.post("/registerUser", {
                    username: values.userName,
                    password: values.password,
                  });
                } catch (e) {
                  console.log(e.message);
                } finally {
                  actions.resetForm();
                  history.push("/Login");
                }
              }}
            >
              {(values, isSubmitting) => (
                <Form>
                  <MyTextField name="userName" type="text" label="User Name " />
                  <br />
                  {/* <MyTextField
                    name="email"
                    type="email"
                    label="Email "
                  />
                  <br /> */}
                  <MyTextField
                    name="password"
                    type="password"
                    label="Password "
                  />
                  <br />
                  <MyTextField
                    name="repass"
                    type="password"
                    label="Renter password "
                  />
                  <br />
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={NewTrainer}
                        onChange={handleChange}
                        value={NewTrainer}
                        color="primary"
                        name="AddTrainer"
                        size="small"
                      />
                    }
                    label="New Trainer"
                    labelPlacement="end"
                  />
                  <MyTrainerSelect
                    disabled={NewTrainer}
                    name="trainer"
                    as="select"
                    label="Trainer "
                    trainers={trainers}
                    newTrainer={NewTrainer}
                  /> */}
                  <Button
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
