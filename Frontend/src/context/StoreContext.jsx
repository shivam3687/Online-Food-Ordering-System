import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    // ✅ SAFE URL (IMPORTANT FIX)
    const url = import.meta.env.VITE_API_URL || "https://online-food-ordering-w3br.onrender.com";

    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [search, setSearch] = useState("");

    // ✅ Add to Cart (SAFE)
    const addToCart = async (itemId) => {
        try {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
            }));

            if (token) {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.log("Add to cart error:", error);
        }
    };

    // ✅ Remove from Cart (SAFE)
    const removeFromCart = async (itemId) => {
        try {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] - 1
            }));

            if (token) {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.log("Remove from cart error:", error);
        }
    };

    // ✅ Total Cart
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

    // ✅ Fetch Food (SAFE + DEBUG)
    const fetchFoodList = async () => {
        try {
            console.log("API URL:", url);

            const response = await axios.get(`${url}/api/food/list`);

            console.log("FOOD DATA:", response.data);

            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.log("Fetch food error:", error);
        }
    };

    // ✅ Load Cart
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