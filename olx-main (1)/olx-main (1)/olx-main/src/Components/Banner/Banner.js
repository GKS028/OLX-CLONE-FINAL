import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";
import {AllPostContext} from "..//../contextStore/AllPostContext"
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom

import "./Banner.css";

// function Banner() {
//   let [category, setCategory] = useState();
//   const history = useHistory(); // Initialize useHistory

//   // Handle the selection of "MyAds"
//   const handleMyAds = () => {
//     history.push("/my-ads"); // Redirect to the MyAds page
//   };

function Banner() {
  //const {allPost,setAllPost}=useContext(AllPostContext) // from Search
  //const {setPostContent}=useContext(PostContext)  // from Search
  
  let [category, setCategory] = useState();

  const history = useHistory(); // Initialize useHistory

  // Handle the selection of "MyAds"
  const handleMyAds = () => {
    history.push("/myads"); // Redirect to the MyAds page
  };
  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Cars">Cars</option>
              <option value="Cameras & Lenses">Cameras & Lenses</option>
              <option value="Computers & Laptops">Computers & Laptops</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Tablets">Tablets</option>
              {/*<option value="MyAds">MyAds</option>*/} {/* Add MyAds option */}
              {/* <option value="MyAds">MyAds</option>    changes made */}
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Cars")} >Cars</span>
            <span onClick={()=>setCategory("Cameras & Lenses")} >Cameras & Lenses</span>
            <span onClick={()=>setCategory("Computers & Laptops")} >Computers & Laptops</span>
            <span onClick={()=>setCategory("Mobile Phones")} >Mobile Phones</span>
            <span onClick={()=>setCategory("Motorcycles")} >Motorcycles</span>
            <span onClick={()=>setCategory("Tablets")} >Tablets</span>
            {/*<span onClick={handleMyAds}>MyAds</span>*/} {/* Handle MyAds option */}
            {/* <Link to="/Myproduct">
              <button className="logout-btn">MY ADS  </button>
            </Link> */}
            {/* <span onClick={()=>setCategory("MyAds")} >MyAds</span>    changes made */}
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
      {/* Render DynamicPosts only when category is selected */}
     { category!=null && <DynamicPosts category={category}/>  }
    </div>
  );
}

export default Banner;
