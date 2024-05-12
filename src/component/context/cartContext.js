"use client";
import { createContext, useEffect, useState } from "react";
import fetchApi from "../util/fetchApi";
import { toast } from "react-toastify";
export const CartContext = createContext({
  cartItems: [],
  favorite: [],
  addToFav: async () => {},
  deleteToFav: async () => {},
  addProductToCart: async () => {},
  removeProductFromCart: async () => {},
  clearProductFromCart: async () => {},
});

//old

// export const cartContext = createContext({
//   cartItems: [],
//   addProductToCart: () => {},
//   removeProductFromCart: () => {},
//   clearProductFromCart: () => {},
// });
export const CartProvider = ({ children, session }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [updatingCart, setUpdatingCart] = useState(false);

  ////console.log("cartItems", cartItems);
  ////console.log("session", session);
  useEffect(() => {
    const getData = async () => {
      try {
        const { error, data } = await fetchApi("/user/cart");
        if (error) throw error;
        ////console.log("data cart", data?.data);

        setCartItems((prevItems) => [...prevItems, ...data?.data]);
      } catch (error) {
        toast.error(
          error?.message ||
            error ||
            "an expected error happen please try again later"
        );
        // if (error.status === 401) {
        //   await signOut();
        // }
      }
    };
    if (session?.user) {
      getData();
    }
  }, [session]);

  useEffect(() => {
    const getFav = async () => {
      try {
        const { data, error } = await fetchApi("/favorite");
        if (error) throw error;
        ////console.log("data fav", data.data);
        setFavorite((prevItems) => [...prevItems, ...data?.data]);
      } catch (error) {
        toast.error(
          error?.message ||
            error ||
            "an expected error happen please try again later"
        );
      }
    };
    if (session?.user) {
      getFav();
    }
  }, [session]);

  const addToFav = async (product) => {
    if (session?.user) {
      if (updatingCart) {
        throw new Error("please take a while between each request");
      }

      setUpdatingCart(true); // Start updating process

      try {
        const { data, error } = await fetchApi(`/favorite/${product._id}`, {
          method: "POST",
        });
        if (error) throw error;
        setFavorite((prevFavorites) => [...prevFavorites, product]);
      } catch (error) {
        throw error;
      } finally {
        setUpdatingCart(false); // End updating process
      }
      return favorite;
    }
    return setFavorite((prevFavorites) => [...prevFavorites, product]);

    // toast.error("an expected error happen please try again later");
  };

  const deleteToFav = async (product) => {
    if (session?.user) {
      if (updatingCart) {
        throw new Error("please take a while between each request");
      }
      if (updatingCart) {
        return;
      }
      setUpdatingCart(true); // Start updating process

      try {
        const { data, error } = await fetchApi(`/favorite/${product._id}`, {
          method: "DELETE",
        });
        if (error) throw error;
        setFavorite((prevFavItems) =>
          prevFavItems.filter(
            (item) => (item.product?._id || item.product) !== product._id
          )
        );
      } catch (error) {
        throw error;
      } finally {
        setUpdatingCart(false); // End updating process
      }

      return favorite;
    }
    setFavorite((prevFavItems) =>
      prevFavItems.filter((item) => item._id !== product._id)
    );
    return favorite;
  };

  const addProductToCart = async (product) => {
    if (session?.user) {
      // if (updatingCart) {
      //   throw new Error("please take a while between each request");
      // }

      setUpdatingCart(true); // Start updating process

      const existingProduct = cartItems.find(
        (item) => item._id === product._id
      );

      try {
        if (existingProduct) {
          // if (existingProduct.quantity < existingProduct.product.stock) {
          ////console.log("product in ", existingProduct);
          const { error, data } = await fetchApi("/user/cart/" + product._id, {
            method: "PUT",
            body: JSON.stringify({ quantity: existingProduct.quantity + 1 }),
          });

          if (error) throw error;

          setCartItems((prevCartItems) => {
            // Update the existing product
            return prevCartItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          });

          // }
        } else {
          ////console.log("work else");

          const { error, data } = await fetchApi("/user/cart/" + product._id, {
            method: "POST",
            body: JSON.stringify({ product }),
          });
          if (error) throw error;

          setCartItems((prevCartItems) => [
            ...prevCartItems,
            {
              ...product,
              quantity: 1,
            },
          ]);
        }
      } catch (error) {
        throw error;
      } finally {
        setUpdatingCart(false); // End updating process
      }
      return cartItems; // Return the updated cartItems
    }
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      setCartItems((prevCartItems) => {
        // Update the existing product
        return prevCartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 }, // Correctly adding a new object with spread operator
      ]);
    }
    ////console.log("cartItems", cartItems);

    return cartItems; // Return the updated cartItems
  };

  const removeProductFromCart = async (product) => {
    if (session?.user) {
      if (updatingCart) {
        throw new Error("please take a while between each request");
      }

      setUpdatingCart(true); // Start updating process

      const existingProduct = cartItems.find(
        (item) => item._id === product._id
      );

      ////console.log("cartItems", cartItems);
      ////console.log("product", product);

      ////console.log("existingProduct", existingProduct);

      try {
        if (existingProduct && existingProduct.quantity > 1) {
          ////console.log("product in ", existingProduct);
          const { error, data } = await fetchApi("/user/cart/" + product._id, {
            method: "PUT",
            body: JSON.stringify({ quantity: existingProduct.quantity - 1 }),
          });

          if (error) throw error;

          setCartItems((prevCartItems) => {
            // Update the existing product
            return prevCartItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          });
        } else {
          ////console.log("work else");

          const { error, data } = await fetchApi("/user/cart/" + product._id, {
            method: "DELETE",
          });
          if (error) throw error;

          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== product._id)
          );
        }
      } catch (error) {
        throw error;
      } finally {
        setUpdatingCart(false); // End updating process
      }
      return cartItems; // Return the updated cartItems
    }
    ////console.log("existingProduct after seesion?.user", existingProduct);
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct && existingProduct.quantity > 1) {
      setCartItems((prevCartItems) => {
        // Update the existing product
        return prevCartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item._id !== product._id)
      );
    }
    return cartItems; // Return the updated cartItems
  };

  const clearProductFromCart = async (product) => {
    if (session?.user) {
      if (updatingCart) {
        throw new Error("please take a while between each request");
      }

      setUpdatingCart(true); // Start updating process
      try {
        const { error, data } = await fetchApi("/user/cart/" + product._id, {
          method: "DELETE",
        });
        if (error) throw error;

        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== product._id)
        );
      } catch (error) {
        throw error;
      } finally {
        setUpdatingCart(false); // End updating process
      }
      return cartItems; // Return the updated cartItems
    }
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== product._id)
    );
    return cartItems; // Return the updated cartItems
  };
  const value = {
    favorite,
    cartItems,
    setCartItems,
    addToFav,
    deleteToFav,
    addProductToCart,
    removeProductFromCart,
    clearProductFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
