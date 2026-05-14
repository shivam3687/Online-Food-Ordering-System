import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'
import add_icon_white from '../../assets/add_icon_white.png'

const FoodItem = ({ id, name, price, description, image }) => {

  const { url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const imageUrl = image
    ? `${url}/images/${image}`
    : "https://via.placeholder.com/150";

  return (
    <div className='food-item'>

      <div className="food-item-img-container">

        <img
          className='food-item-image'
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />

        {/* ✅ ADD BUTTON */}
        {!cartItems?.[id] ? (
          <div className="add-btn" onClick={() => addToCart(id)}>
            +
          </div>
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
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>

    </div>
  )
}

export default FoodItem;
