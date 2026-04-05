import React from "react";
import styles from "./Home.module.css";
import Cart from "./../Cart/Cart";
import Categories from "./../Categories/Categories";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Helmet } from "react-helmet";

import { useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import FeatureProducts from "../FeatureProducts/FeatureProducts";

const Home = () => {
  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <FeatureProducts/>
    </>
  );
};

export default Home;
  /*<Helmet>
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />*/