import Message from "@/component/message/message";
import Orders from "@/component/user/profile-Details/orders";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "My Refund",
  description: "My Refund Page",
};
const getData = async () => {
  try {
    const { data, error } = await fetchApi("/refund", {
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
  const { data, error } = await getData();
  if (error) {
    return <Message error={error} />;
  }
  return (
    <Orders title="Refunds" data={data} /> //{/* <Error error={null} />; */}
  );
};

export default Page;
