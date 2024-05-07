import Message from "@/component/message/message";
import UpdateImage from "@/component/product/updateImage/updateImage";
import fetchApi from "@/component/util/fetchApi";

export const metadata = {
  title: "Update Product Images",
  description: "Update Product Images",
};
const getData = async (id) => {
  try {
    const { data, error } = await fetchApi(`/product/${id}`);
    if (error) throw error;
    return { data: data?.data.images || [] };
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
  return <UpdateImage image={data} id={id} />;
};
export default Page;
