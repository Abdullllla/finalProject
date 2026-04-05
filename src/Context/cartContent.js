import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContent = createContext();
 
  let headers = {
    token: localStorage.getItem("userToken")
  }

  function addToCart(id) {
     return axios
     .post( 'https://ecommerce.routemisr.com/api/v1/cart',{
       productId: id 
      },{
    headers 
  } )
  .then((res)=>res)
  .catch((err)=>err);
 }
    
   function getCart() {
     return axios
     .get('https://ecommerce.routemisr.com/api/v1/cart',{
    headers, 
  })
  .then((res)=>res)
  .catch((err)=>err); 

}

   function deleteProductFromCart(id) {
     return axios
     .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers, 
  })
  .then((res)=>res)
  .catch((err)=>err);
}


   function updateProductQuantity(id,count) {
     return axios
     .put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count
    },{
    headers, 
  })
  .then((res)=>res)
  .catch((err)=>err);
}


export default function CartContentProvider(props){

const[cartId,setCartId] = useState(null);
const[numOfCartItems, setNumOfCartItems] = useState(null)

function onlinePayment(shippingAddress){
  //"69cd25f6460be8e0dbc85ad9"

      return axios
     .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
      shippingAddress
    },
    {
    headers, 
  })
  .then((res)=>res)
  .catch((err)=>err);

}

async function getInitialCart(){
let {data} =  await getCart(); 
setNumOfCartItems(data?.numOfCartItems);
setCartId(data?.data._id)
}
useEffect(()=>{
  getInitialCart();
  },[])
     
    return <CartContent.Provider value={{addToCart, getCart, deleteProductFromCart,updateProductQuantity,onlinePayment,numOfCartItems, setNumOfCartItems}}>{props.children}</CartContent.Provider>;

}