import React from 'react'
import styles from './CategoriesSlider.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from "react-slick";
import Categories from './../Categories/Categories';



export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true
  };
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  // let {data} = useQuery("allCategories", getCategories)
  // console.log(data);
  const { data, isLoading } = useQuery({
     queryKey: ['allCategories'],
      queryFn: getCategories}) 
  console.log(data);
  
  return (
         
  <Slider {...settings}>
      {data?.data?.data.map((ele)=>
      
      <div key={ele._id}>
      <img height={300} src={ele.image} alt={ele.name} />
      <h4>{ele.name}</h4>
      </div>
      
    )}

    </Slider> 
    
  )
}

