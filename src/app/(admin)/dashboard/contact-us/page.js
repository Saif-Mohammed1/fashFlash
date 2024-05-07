import Paginate from "@/component/Pagination/pagination";
import ContactUs from "@/component/admin-dashboard/contactUs";
import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "Contact Us Management ",
  description: "Contact Us Management Dashboard",
};

const queryParams = async (searchParams) => {
  const url = new URLSearchParams();

  // Conditionally add parameters
  if (searchParams.name !== undefined) {
    url.append("name", searchParams.name);
  }
  // You can uncomment and add other parameters similarly
  if (searchParams.sort !== undefined) {
    url.append("sort", searchParams.sort);
  }
  if (searchParams.page !== undefined) {
    url.append("page", searchParams.page);
  }
  if (searchParams.limit !== undefined) {
    url.append("limit", searchParams.limit);
  }

  const queryString = url.toString();
  try {
    const { data, error } = await fetchApi(
      `/dashboard/contact-us?${queryString}`,
      {
        headers: headers(),
      }
    );
    // const fav = await fetchApi("/favorite", {
    //   headers: headers(),
    // });
    if (error) {
      throw error;
    }

    return {
      data: data?.data || [],
      //  fav: fav?.data?.data || [],
      pageCount: data?.pageCount || 1,
    };
  } catch (error) {
    return { error };
  }
};
const Page = async ({ searchParams }) => {
  const { data, pageCount, error } = await queryParams(searchParams);

  if (error) {
    return <Message error={error} />;
  }
  return (
    <>
      {" "}
      <ContactUs data={data || []} />
      <Paginate pageCount={pageCount} />
      {/* <Products orders={data?.data} /> */}
      {/* <Cher /> */}
    </>
  );
};

export default Page;
