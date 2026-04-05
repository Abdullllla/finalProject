import React, { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

import Slider from "react-slick";
import { CartContent } from "../../Context/cartContent";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

// import Details from './Details';

function Details() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let {addToCart, setNumOfCartItems} = useContext(CartContent);

  let params = useParams();

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${params.id}`,
    );
    setDetails(data.data);
    console.log(data);
    setIsLoading(false);
  }

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



  useEffect(() => {
    getProductDetails(params.id);
  }, []);
  return (
    <>
      <div className="container">
        {isLoading ? (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={"justify-content-center"}
            wrapperStyle=""
            visible={true}
          />
        ) : (
          <div className="row align-items-center">
             <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
            </Helmet>
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((img,index) => (
                  <img key={index} src={img} alt="" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h2>{details.title}</h2>
              <p>{details.description}</p>
              <p>{details.category.name}</p>
              <div className="d-flex justify-content-between">
                <h5>{details.price}EGP</h5>
                <h5>
                
                  <i className="fa fa-star rating-color"></i>
                  {details.ratingsAverage}
                </h5>
              </div>
              <button onClick={()=>addCart(details.id)} className="btn bg-main w-100 text-white"> Add cart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Details;
