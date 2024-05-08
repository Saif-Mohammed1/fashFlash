import Address from "@/component/address/address";
import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "My Address",
  description: "My Address Page",
};
const getData = async () => {
  try {
    const { data, error } = await fetchApi("/user/address", {
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
      <Address address={data} /> //{/* <Error error={null} />; */}
    );
  } catch (error) {
    throw error;
  }
};

export default Page;
