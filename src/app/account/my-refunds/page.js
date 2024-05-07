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
    return data?.data || [];
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async () => {
  const refund = await getData();

  return (
    <Orders title="Refunds" data={refund || []} /> //{/* <Error error={null} />; */}
  );
};

export default Page;
