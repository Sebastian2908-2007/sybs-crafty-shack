import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import { checkoutAdd2CartBtnStyle } from '../styles/commonMuiStyles/muiButtonStyles';
import { useStoreContext } from '../utils/Globalstate';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { ProductPriceSpan } from '../styles/Spans.styled';

export default function ProductCard({product}) {
  /**this is state for the text that resides in the product item buttons so that it can be changed when adding to cart */
  const [crtBtnTxt, setCrtBtnTxt] = useState('Add To Cart');
  /**destructure product */
  const {
    description,
    image,
    name,
    price,
    /**quantity un note later for in Stock*/
    _id
  } = product;
  //console.log(product);

  /**destructure Location from image that is nested in the product */
  const {
Location
  } = image;


  /**destructure watch basically is useReducer for state and dispatch access */
  const [state,dispatch] = useStoreContext();
  /**destructure cart from state */
  const { cart } = state;

  /**this function adds to the cart and updates the global state with a product */
  const addToCart = () => {
   const isItemInCart = cart.find((cartItem) => cartItem._id === _id);
   if(isItemInCart) { 
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(isItemInCart.purchaseQuantity) + 1
    });
    /**this sets button text momentarily when an item is added twice*/
    setCrtBtnTxt('quantity updated !');
    setTimeout(() => {setCrtBtnTxt('Add To Cart')},3000)
   }else { 
    dispatch({
      type: ADD_TO_CART,
      /**purchaseQuantity is not on data from db its created right here for the global state */
      product: { ...product, purchaseQuantity: 1 }
    });
    /**this sets button text momentarily when an item is added*/
    setCrtBtnTxt('Added to cart!');
    setTimeout(() => {setCrtBtnTxt('Add To Cart')},3000)
  }
  };

  return (
    <Card sx={{ boxShadow:' 0 0 5px black',height:'100%',maxWidth: '100%', backgroundColor: "rgb(255,255,255,0.6)", border: '1px solid black'}}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={Location}
      />
      <CardContent sx={{display:'flex', flexDirection:'column',alignItems:'center'}} >
        <Typography gutterBottom variant="h5" component="div" 
        sx={{textShadow: '0 0 10px rgb(248, 248, 128)',fontSize:{xs:'1.5rem',xl:'1.8rem'}}}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary"
         sx={{backgroundColor:'rgb(248, 248, 128,0.4)',padding:"2%",fontWeight:'bolder',fontSize:{xs:'1.3rem',xl:'1.5rem'}}}>
         {description}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
      <ProductPriceSpan padding='3%' marginBottom='.55em'>
        ${price}
      </ProductPriceSpan>
        <Button size="small" sx={checkoutAdd2CartBtnStyle} onClick={addToCart}>{crtBtnTxt}</Button>
      </CardActions>
    </Card>
  );
}