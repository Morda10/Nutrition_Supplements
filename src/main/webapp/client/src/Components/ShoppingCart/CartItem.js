import React, { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  Paper,
  Radio,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
  },
  image: {
    width: 150,
    height: 200,
    margin:"0.5rem"
  },
  remove: {
    color: theme.palette.error.main,

  },
}));

export const CartItem = ({ item, amount, removeItem, itemsForPurchase, setitemsForPurchase }) => {
  const classes = useStyles();
  const [selected, setselected] = useState(false)
  // const noItemImage = useSelector((state) => state.noItemImage);

  const handleClicked = (e) => {
    const itemID = item.id
    if(!selected === true){
      console.log(itemID)
      setitemsForPurchase([...itemsForPurchase,itemID])
    }
    else if(itemsForPurchase.includes(itemID)){
      const array = itemsForPurchase
      const index = array.indexOf(itemID);
      if (index > -1) {
        array.splice(index, 1);
      }
      setitemsForPurchase(array)
    }
    console.log(itemsForPurchase)
    setselected(!selected)
  }

  return (
      <Grid item xs={10} md={8} lg={6} style={{marginLeft: "3rem"}}>
        <Paper className={classes.root}>
        <Grid container justify="center" alignItems="center"> 
          <Grid item xs={2}>
     
          <img src={item.image} alt="svd" className={classes.image}></img>
     
        </Grid>
        <Grid item xs={3}>
        <Typography
            style={{
              fontWeight: "bold",
            }}
            align="center"
          >
            {item.cost}$
          </Typography>
              </Grid>
            <Grid>

          <Typography
            style={{
              fontWeight: "bold",
            }}
            align="center"
            >
            amount: {amount}
          </Typography>
            </Grid>

          <Grid item  xs={2} style={{marginLeft:"8rem"}}>

          <Radio checked={selected}
          value={item.id}
          onClick={(e)=>handleClicked(e)}
          // style={{margin:"5rem"}}
          />
        {/* </Grid> */}
        {/* <Grid item xs={2}> */}
          <IconButton
            className={classes.remove}
            onClick={() => removeItem(item)}
            >
            <RemoveCircleOutlineIcon  />
          </IconButton>
          </Grid>

         
          </Grid>
        
      </Paper>
      </Grid>
  );
};
    