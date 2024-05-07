// import ProductDetails from "@/component/product/product-details/productDetails";
import Message from "@/component/message/message";
import ProductDetailsMo from "@/component/product/product-details/productDetailsmo";
import fetchApi from "@/component/util/fetchApi";

export const metadata = {
  title: "Product Details",
  description: "Product page ",
};
const getData = async (id) => {
  try {
    const { data, error } = await fetchApi(`/product/${id}`);
    if (error) throw error;
    return { data: data?.data || [] };
  } catch (error) {
    return { error };
  }
};
const Page = async ({ params }) => {
  const id = params.id;
  const { data, error } = await getData(id);

  if (error) {
    return <Message error={error} />;
  }
  return <ProductDetailsMo product={data} />;
};
export default Page;
