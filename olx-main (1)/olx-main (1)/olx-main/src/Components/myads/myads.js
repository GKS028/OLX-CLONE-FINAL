import React, { useEffect, useState } from "react";
import { Firebase } from "../../firebase/config";

function MyAds() {
  const [userAds, setUserAds] = useState([]);

  useEffect(() => {
    // Fetch user's ads from the database
    const userId = Firebase.auth().currentUser.userId;
    const userAdsRef = Firebase.firestore().collection("ads").where("userId", "==", userId);

    userAdsRef.get()
      .then((querySnapshot) => {
        const ads = [];
        querySnapshot.forEach((doc) => {
          ads.push({ id: doc.id, ...doc.data() });
        });
        setUserAds(ads);
      })
      .catch((error) => {
        console.error("Error fetching user ads:", error);
      });
  }, []);

  return (
    <div>
      <h1>My Ads</h1>
      <ul>
        {userAds.map((ad) => (
          <li key={ad.id}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            {/* Display other ad details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyAds;





// import React, { useContext } from "react";
// import { AllPostContext } from "../../contextStore/AllPostContext";
// import { Firebase } from "../../firebase/config";

// function MyAds() {
//   const { userAds } = useContext(AllPostContext); // Assuming you have a context for user's ads

//   return (
//     <div>
//       <h1>My Ads</h1>
//       {userAds.map(ad => (
//         <div key={ad.id}>
//           <h2>{ad.title}</h2>
//           <p>{ad.description}</p>
//           {/* Display other ad details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyAds;
