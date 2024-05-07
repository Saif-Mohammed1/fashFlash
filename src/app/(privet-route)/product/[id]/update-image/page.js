import Message from "@/component/message/message";
import UpdateImage from "@/component/product/updateImage/updateImage";
import fetchApi from "@/component/util/fetchApi";

export const metadata = {
  title: "Update Product Images",
  description: "Update Product Images",
};
const data = async (id) => {
  try {
    const { data, error } = await fetchApi(`/product/${id}`);
    if (error) throw error;
    return data?.data.images;
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async ({ params }) => {
  const id = params.id;
  const Images = await data(id);
  return <UpdateImage image={Images} id={id} />;
};
export default Page;
