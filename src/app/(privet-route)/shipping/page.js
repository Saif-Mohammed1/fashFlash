import Message from "@/component/message/message";
import Shipping from "@/component/shipping/shipping";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "Shipping Page ",
  description: "Shipping Page",
};
const getData = async () => {
  try {
    const { data, error } = await fetchApi("/user/address", {
      headers: headers(),
    });

    if (error) {
      throw error;
    }
    return data?.data || [];
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async () => {
  const address = await getData();
  return (
    <Shipping address={address || []} /> //{/* <Error error={null} />; */}
  );
};

export default Page;
