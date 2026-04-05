import React, { useContext } from 'react';
import axios from 'axios';
import { BallTriangle} from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContent } from '../../Context/cartContent';
import toast from 'react-hot-toast'; 



 function FeatureProducts() { 
  let {addToCart,setNumOfCartItems} =useContext(CartContent)
  function getProducts() {
   return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
    let { isLoading, data} = 
    useQuery({ queryKey: ['featuredProducts'],
       queryFn: getProducts })

async function addCart(id){
  let res = await addToCart(id);
  console.log(res?.data?.status);
  if (res?.data?.status === "success"){
    toast.success('product added succ');
    setNumOfCartItems(res.data.numOfCartItems)

  } else{ 
        toast.error('product not added');
  }
}


return (
  <>
  <div className="py-5 text-center"> 
    {isLoading  ? <BallTriangle
height={100}
width={100}
radius={5}
color="#4fa94d"
ariaLabel="ball-triangle-loading"
wrapperClass={'justify-content-center'}
wrapperStyle={{}}
visible={true}
/>: <div className="row">
        {data?.data?.data.map((ele) => <div key={ele.id} className="col-md-2">
            <div className="product px-2 py-3">
              <Link to={`/details/${ele.id}`}>
                  <img src={ele.imageCover} className='w-100' alt={ele.title}/>
                 <p className='text-main'>{ele.category.name  }</p>
                  <h3 className='h6'>{ele.title.split(" ").slice(0,3).join(" ")}</h3>
                    <div className="d-flex justify-content-between">
                   <p>{ele.price}EGP</p>
                       <p>
                     <i className='fa fa-star rating-color'></i>
                    {ele.ratingsAverage}
                  </p>
               </div>
              </Link>
            <button onClick={()=>addCart(ele.id)} className='btn bg-main text-white w-100'>Add to Cart </button>
            </div>
          </div>
        )}

        </div>
        
      }

      </div>
      </>
  
)
}

export default FeatureProducts;
