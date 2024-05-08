import Message from "@/component/message/message";
import Orders from "@/component/user/profile-Details/orders";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "My Reports",
  description: "My Reports Page",
};
const getData = async () => {
  try {
    const { data, error } = await fetchApi("/report", {
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
    return (
      <Orders title="Reports" data={data} /> //{/* <Error error={null} />; */}
    );
  } catch (error) {
    throw error;
  }
};

export default Page;
