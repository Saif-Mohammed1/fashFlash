import fetchApi from "@/component/util/fetchApi";

export const addProductToCart = async (cartItems, product) => {
  const existingProduct = cartItems.find((item) => item._id === product._id);
  if (existingProduct) {
    //console.log("work else existingProduct");

    if (existingProduct.quantity < existingProduct.stock)
      try {
        const { error, data } = await fetchApi("/user/cart/" + product._id, {
          method: "PUT",
          body: JSON.stringify({ quantity: product.quantity + 1 }),
        });
        if (error) throw error;
      } catch (error) {
        throw error;
      }
    return;
  } else {
    //console.log("work else");

    try {
      const { error, data } = await fetchApi("/user/cart/" + product._id, {
        method: "POST",
        body: JSON.stringify({ product }),
      });
      if (error) throw error;
    } catch (error) {
      throw error;
    }

    return; // Return the updated cartItems
  }
};

export const removeProductFromCart = (product) => {
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

export const clearProductFromCart = (product) => {
  setCartItems((prevCartItems) =>
    prevCartItems.filter((item) => item._id !== product._id)
  );
  return cartItems; // Return the updated cartItems
};
