import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  const { food_list, search } = useContext(StoreContext);

  // ✅ SAFE filter logic (no crash)
  const filteredFood = (food_list || []).filter((item) => {

  const matchesCategory =
    category === "All" || category === item?.category;

  const matchesSearch =
    (item?.name || "")
      .toLowerCase()
      .includes((search || "").toLowerCase());

  return matchesCategory && matchesSearch;
});

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {filteredFood && filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}   // ✅ FIX: index hata diya (important)
              id={item._id}
              name={item.name || "No Name"}
              price={item.price || 0}
              description={item.description || ""}
              image={item.image || ""}
            />
          ))
        ) : (
          <p style={{ marginTop: "20px", color: "#777" }}>
            No food items found
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;