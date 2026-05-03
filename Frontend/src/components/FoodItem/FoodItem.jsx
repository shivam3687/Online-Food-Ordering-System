import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

  const { 
    url = "https://online-food-ordering-w3br.onrender.com",
    cartItems,
    addToCart,
    removeFromCart
  } = useContext(StoreContext);

  const imageUrl = image
    ? `${url}/images/${image}`
    : "https://via.placeholder.com/150";

  return (
    <div className='food-item'>

      <div className="food-item-img-container">
        <img
          className='food-item-image'
          src={imageUrl}
          alt={name || "food"}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />

        {/* ✅ ADD TO CART BUTTON */}
        {!cartItems?.[id] ? (
          <button className="add-btn" onClick={() => addToCart(id)}>
            Add +
          </button>
        ) : (
          <div className="counter">
            <button onClick={() => removeFromCart(id)}>-</button>
            <span>{cartItems[id]}</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p>{name || "No Name"}</p>
        <p className="food-item-desc">
          {description || "No description"}
        </p>
        <p className="food-item-price">
          ₹{price || 0}
        </p>
      </div>

    </div>
  )
}

export default FoodItem;