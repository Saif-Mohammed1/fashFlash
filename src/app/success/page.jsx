import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

const Page = async ({ searchParams }) => {
  if (!searchParams.session_id) return;
  const item = await fetchApi(
    "/stripe/checkout?session_id=" + searchParams.session_id,
    {
      headers: headers(),
    }
  );

  return (
    <Message
      data={item}
      message={"we have sent an invoice to you email"}
      redirect={true}
    />
  );
};

export default Page;
