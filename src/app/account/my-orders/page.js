import Message from "@/component/message/message";
import Orders from "@/component/user/profile-Details/orders";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "My Orders",
  description: "My Orders Page",
};
const getData = async () => {
  try {
    const { data, error } = await fetchApi("/orders", {
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
  const orders = await getData();

  return <Orders data={orders || []} />;
};

export default Page;
