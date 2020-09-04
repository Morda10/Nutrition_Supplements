import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  //   Box,
} from "@material-ui/core";
import MyTextField from "./Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "./redux/actions/authActions";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("User name is required"),
  password: Yup.string()
    .min(2, "Password must be 2 characters or longer")
    .required("password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  button: {
    backgroundColor: "#202020",
    color: "white",
  },
}));

const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  // const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (user) {
      history.push("/Items");
    }
  }, [user, history]);

  return (
    <>
      <Grid container justify="center" style={{ marginTop: "3em" }}>
        <Grid item xs={10} sm={8} lg={6} xl={4}>
          <Card className={classes.root}>
            <CardContent display="flex">
              <Typography align="center" variant="h3">
                Login
              </Typography>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const res = await axios.post("/authenticate", values);
                    const { jwt } = res.data;
                    const { data } = await axios.get(
                      `/getUserId/${values.username}`
                    );
                    // const { id } = data;
                    // console.log(data);
                    console.log(jwt);
                    const userDetails = { id: data, username: values.username };
                    dispatch(setUser(jwt, userDetails));
                    dispatch(setToken(jwt));
                    // console.log(data);
                    history.push("/Items");
                  } catch (e) {
                    // console.log(e.name);
                    setErrors(e.message);
                    actions.resetForm();
                  }
                }}
              >
                {(values, isSubmitting) => (
                  <Form>
                    <MyTextField name="username" type="text" label="Username" />
                    <br />
                    <MyTextField
                      name="password"
                      type="password"
                      label="Password "
                    />
                    <br />
                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <Typography variant="h6" color="error">
                {errors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
