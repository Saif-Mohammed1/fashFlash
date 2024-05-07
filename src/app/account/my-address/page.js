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
    return data?.data || [];
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async () => {
  const address = await getData();
  return (
    <Address address={address || []} /> //{/* <Error error={null} />; */}
  );
};

export default Page;
