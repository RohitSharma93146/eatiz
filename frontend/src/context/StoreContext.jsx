import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"

    const [token, setToken] = useState("");
    const [food_list, setFoodlist] = useState([]); 


    // Add an item to the cart or increment its quantity
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // increment by 1 if exists, otherwise set to 1
        }));
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    // Remove an item from the cart or decrement its quantity
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 1) {
                // If the quantity is more than 1, decrement by 1
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                // If the quantity is 1 or less, remove the item from the cart
                const newCartItems = { ...prev };
                delete newCartItems[itemId];
                return newCartItems;
            }
        });
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item not found in food_list: ${item}`);
                }
            }
        }
        return totalAmount;
    }
    
    const fetchFoodlist = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodlist(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodlist()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
