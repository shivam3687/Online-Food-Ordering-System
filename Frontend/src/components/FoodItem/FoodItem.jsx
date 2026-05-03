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

        {/* ✅ GREEN ADD BUTTON */}
        {!cartItems?.[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src="https://cdn-icons-png.flaticon.com/512/1828/1828906.png"
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name || "No Name"}</p>
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