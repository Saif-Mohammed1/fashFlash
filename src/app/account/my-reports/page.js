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
    return data?.data || [];
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async () => {
  const report = await getData();

  return (
    <Orders title="Reports" data={report || []} /> //{/* <Error error={null} />; */}
  );
};

export default Page;
