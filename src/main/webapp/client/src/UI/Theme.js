import { createMuiTheme } from "@material-ui/core/styles";

const mainBlue = "#32709F";
// const arcOrange = "#FFBA60";
const mainGrey = "#92969a";
const errorColor = "#DB1616";
const backGround = "rgb(224, 226, 233)";

export default createMuiTheme({
  palette: {
    common: {
      black: mainBlue,
      grey: mainGrey,
      backGround: backGround,
      errorColor: errorColor,
    },
    primary: {
      main: mainBlue,
    },
    secondary: {
      main: mainGrey,
    },
    error: {
      main: errorColor,
    },
    background: {
      paper: "#fff",
      default: backGround,
    },
    button: {
      color: mainBlue,
    },
  },
});
