import Paginate from "@/component/Pagination/pagination";
import Users from "@/component/admin-dashboard/users";
import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "Users Dashboard ",
  description: "Dashboard",
};
const queryParams = async (searchParams) => {
  const url = new URLSearchParams();

  // Conditionally add parameters
  if (searchParams.email !== undefined) {
    url.append("email", searchParams.email);
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
  try {
    const queryString = url.toString();

    const { data, error } = await fetchApi(`/dashboard/users?${queryString}`, {
      headers: headers(),
    });
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
      <Users users={data} />
      <Paginate pageCount={pageCount} />
      {/* <Cher /> */}
    </>
  );
};

export default Page;
