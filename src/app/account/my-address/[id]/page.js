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
    return data?.data || [];
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async ({ params }) => {
  const address = await getData(params.id);
  return (
    <Addaddress
      addresses={address || []}
      button="edit"
      title="Update Address"
    /> //{/* <Error error={null} />; */}
  );
};

export default Page;
