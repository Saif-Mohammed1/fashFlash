// import ProductDetails from "@/component/product/product-details/productDetails";
//import api from "@/component/util/api";

// const data = async (id) => {
//   try {
//     const { data } = await api.get(`/product/${id}`);
//     return data?.data;
//   } catch (error) {
//     //console.error("Error fetching product data:", error);

//     //console.log("error?.response?.status", error?.response?.status);
//     throw error;
//   }
// };
const Page = async ({ params }) => {
  // const id = params.id;
  // const product = await data(id);

  return <p>test id</p>;
};
export default Page;
