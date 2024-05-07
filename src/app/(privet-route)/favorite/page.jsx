import FavoriteCart from "@/component/FavoriteCart/FavoriteCart";
// import ProductItem from "@/component/product/product-Item/product-Item";
// import fetchApi from "@/component/util/fetchApi";
// import { headers } from "next/headers";
// import Link from "next/link";

// const getFav = async () => {
//   try {
//     const { data, error } = await fetchApi("/favorite", {
//       headers: headers(),
//     });
//     if (error) throw error;
//     // //console.log("data", data);
//     return data?.data || [];
//   } catch (error) {
//     //console.log("err", error);
//   }
// };

export const metadata = {
  title: "Favorite Product",
  description: "Favorite Product page ",
};
const Favorite = async () => {
  // const data = await getFav();
  return <FavoriteCart />;
};

export default Favorite;
