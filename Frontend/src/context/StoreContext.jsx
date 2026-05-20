import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    // ✅ SAFE URL (fallback included)
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [search, setSearch] = useState("");

    // ✅ ADD TO CART (CRASH SAFE)
    const addToCart = async (itemId) => {
        try {
            setCartItems((prev) => {
                const updated = { ...prev };
                updated[itemId] = updated[itemId] ? updated[itemId] + 1 : 1;
                return updated;
            });

            if (token) {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.log("Add to cart error:", error);
        }
    };

    // ✅ REMOVE FROM CART (SAFE DELETE)
    const removeFromCart = async (itemId) => {
        try {
            setCartItems((prev) => {
                const updated = { ...prev };

                if (updated[itemId] > 1) {
                    updated[itemId] -= 1;
                } else {
                    delete updated[itemId];   // 🔥 IMPORTANT FIX
                }

                return updated;
            });

            if (token) {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.log("Remove from cart error:", error);
        }
    };

    // ✅ TOTAL AMOUNT SAFE
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

    // ✅ FETCH FOOD (SAFE)
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);

            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.log("Fetch food error:", error);
        }
    };

    const clearAuthData = () => {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    };

    // ✅ LOAD CART SAFE
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );

            if (response.data.cartData) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log("Cart load error:", error);
            if (error.response?.status === 401) {
                clearAuthData();
            }
        }
    };

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