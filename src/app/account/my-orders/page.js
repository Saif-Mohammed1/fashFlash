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
    return { data: data?.data || [] };
  } catch (error) {
    return { error };
  }
};
const Page = async () => {
  try {
    const { data, error } = await getData();
    if (error) {
      return <Message error={error} />;
    }
    return <Orders data={data} />;
  } catch (error) {
    throw error;
  }
};

export default Page;
