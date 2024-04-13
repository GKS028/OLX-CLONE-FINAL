import React, { useContext,useState } from "react";
import { useHistory } from "react-router";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import SearchIcon from "../../assets/SearchIcon"
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
import Home from '../../Pages/Home';
import Posts from "../Posts/Posts";
import Login from "../Login/Login";

function Header() {
  const{allPost}=useContext(AllPostContext)
  const{setPostContent}=useContext(PostContext)
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
       setPostContent(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);
  
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };

  const myAdsHandler = () => {
    // Fetch user's ads from the server
    const userId = Firebase.auth().currentUser.userId; // Assuming you store user's ID in Firebase authentication
    const url = `https://firestore.googleapis.com/v1/myads?userId=${userId}`; // Replace YOUR_API_URL with your actual API endpoint
    
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("response ok");
      return response.json();
    })
    .then(data => {
      const userAds = data.ads; // Assuming the server response contains an array of user's ads
      // Set userAds to a context or state variable to pass it to the MyAds component
      // For example, if you have a context for user's ads:
      // setUserAds(userAds);
      // Navigate to a page where user's ads are displayed
      history.push("/myads"); // Assuming you have a route for displaying user's ads
    })
    .catch(error => {
      console.error('Error fetching user ads:', error);
    });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
            <span>
              {/* <OlxLogo></OlxLogo> */}
              <img src="../../../Images/3.png" className="one"></img>
            </span>
          </Link>
        </div>
        <div className="placeSearch">
          <input type="text" 
          placeholder="Search specific product..."
          value={wordEntered}
          onChange={handleFilter}
        />{filteredData.length === 0 ? (
          <div onClick={handleEmptyClick}> <SearchIcon /> </div>
         ) : (
           <div id="clearBtn"  onClick={clearInput} > <Arrow></Arrow></div>
         )}
          {filteredData.length !== 0 && (
        <div className="dataResult-header">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div key={key} className="dataItem-header" onClick={()=>handleSelectedSearch(value)}>
                <p>{value.name} </p>
              </div>
            );
          })}
        </div>
      )}
         
        </div>
        <div className="productSearch">
          <Search />
        </div>
        
        <div className="language">
          {/* <span> ENGLISH </span> */}
          {/* <Arrow></Arrow> */}
        </div>
        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <><Link to="/login">
                <span>Login/</span>
              </Link><Link to="/signup">
                  <span>SignUp</span>
                </Link></>
          )}
          <hr />
        </div>
        {user && (
          <><span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
          <span onClick={myAdsHandler} className="logout-span">
          {/* <span> */}
            {/* <Link to="/Myproduct"> */}
              {/* <button className="logout-btn">MY ADS</button> */} {/*only this button*/}
            {/* </Link> */}
          </span></>
        )}
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
