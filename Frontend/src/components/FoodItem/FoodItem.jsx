import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

  const { url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${url}/images/${image}`
    : "https://via.placeholder.com/150";

  return (
    <div className='food-item'>

      <div className="food-item-img-container">

        <img
          className='food-item-image'
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
        />

        {/* ✅ ADD BUTTON */}
        {!cartItems?.[id] ? (
          <button className="add-btn" type="button" onClick={() => addToCart(id)}>
            +
          </button>
        ) : (
          <div className="food-item-counter">
            <button
              type="button"
              onClick={() => removeFromCart(id)}
              aria-label="Remove one"
            >
              -
            </button>
            <p>{cartItems[id]}</p>
            <button
              type="button"
              onClick={() => addToCart(id)}
              aria-label="Add one"
            >
              +
            </button>
          </div>
        )}

      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>

    </div>
  )
}

export default FoodItem;
