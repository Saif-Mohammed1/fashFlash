import CartItem from "@/component/cart-item/cartItem";
// import AddProduct from "@/component/product/add-product/add-product";
// import fetchApi from "@/component/util/fetchApi";
// import { headers } from "next/headers";

export const metadata = {
  title: "Cart Product",
  description: "Cart Product page ",
};

// const getData = async () => {
//   try {
//     const { data, error } = await fetchApi("/user/cart", {
//       headers: headers(),
//     });
//     if (error) throw error;
//     return data?.data || [];
//   } catch (error) {
//     //console.log("err", error);
//   }
// };
const Page = async () => {
  // const cartItems = await getData();
  return (
    <CartItem />

    // <AddProduct />
  );
};

export default Page;
