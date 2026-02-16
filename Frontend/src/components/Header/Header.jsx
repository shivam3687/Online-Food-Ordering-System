import React from 'react'
import './Header.css'

const Header = () => {

  const handleViewMenu = () => {
    const section = document.getElementById("food-display");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>
          Choose from a diverse menu featuring a array of dishes with the finest
          ingredients and culinary expertise. Our mission is to satisfy your
          cravings and elevate your dinging experience, one delicious meal at a time.
        </p>

        <button onClick={handleViewMenu}>
          View Menu
        </button>
      </div>
    </div>
  )
}

export default Header
