import Addaddress from "@/component/address/add-address";
import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "My Address",
  description: "My Address Page",
};
const getData = async (id) => {
  try {
    const { data, error } = await fetchApi("/user/address/" + id, {
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
const Page = async ({ params }) => {
  const { data, error } = await getData(params.id);
  if (error) {
    return <Message error={error} />;
  }
  return (
    <Addaddress addresses={data} button="edit" title="Update Address" /> //{/* <Error error={null} />; */}
  );
};

export default Page;
