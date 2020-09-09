import { createMuiTheme } from "@material-ui/core/styles";

const mainBlue = "#181836";
// const arcOrange = "#FFBA60";
const mainGrey = "#476CC0";
const errorColor = "#DB1616";
const backGround = "#A8B2CA";
// const backGround = "rgb(224, 226, 233)";

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
