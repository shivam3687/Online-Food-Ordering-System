import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    
    // ✅ BEST PRACTICE: ENV variable use karo
    const url = "https://online-food-ordering-w3br.onrender.com";

    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // ✅ Search state
    const [search, setSearch] = useState("");

    // ✅ Add to Cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.log("Add to cart error:", error);
            }
        }
    };

    // ✅ Remove from Cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.log("Remove from cart error:", error);
            }
        }
    };

    // ✅ Total Cart Amount (SAFE VERSION)
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // ✅ Fetch Food List (IMPORTANT FIX + DEBUG)
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);

            console.log("API RESPONSE:", response.data); // 🔍 DEBUG

            if (response.data.success) {
                setFoodList(response.data.data);
            } else {
                console.log("API returned no success");
            }
        } catch (error) {
            console.log("Fetch food error:", error);
        }
    };

    // ✅ Load Cart Data
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.log("Cart load error:", error);
        }
    };

    // ✅ Initial Load
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }

        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        search,
        setSearch
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;