import Paginate from "@/component/Pagination/pagination";
import Products from "@/component/admin-dashboard/products";
import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";

export const metadata = {
  title: "Products Dashboard ",
  description: "Dashboard",
};
const queryParams = async (searchParams) => {
  const url = new URLSearchParams();

  // Append each parameter only if it's not undefined
  if (searchParams.category !== undefined) {
    url.append("category", searchParams.category);
  }
  if (searchParams.sort !== undefined) {
    url.append("sort", searchParams.sort);
  }
  if (searchParams.fields !== undefined) {
    url.append("fields", searchParams.fields);
  }
  if (searchParams.page !== undefined) {
    url.append("page", searchParams.page);
  }
  if (searchParams.name !== undefined) {
    url.append("name", searchParams.name);
  }
  if (searchParams.limit !== undefined) {
    url.append("limit", searchParams.limit);
  }
  if (searchParams.rating !== undefined) {
    url.append("rating", searchParams.rating);
  }
  if (searchParams.min !== undefined) {
    url.append("price[gte]", searchParams.min);
  }
  if (searchParams.max !== undefined) {
    url.append("price[lte]", searchParams.max);
  }

  const queryString = url.toString();
  try {
    const { data, error } = await fetchApi(
      `/dashboard/products?${queryString}`,
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
      // categories: data?.categories,
    };
  } catch (error) {
    return { error };
  }
};
const Page = async ({ searchParams }) => {
  try {
    const { data, pageCount, error } = await queryParams(searchParams);

    if (error) {
      return <Message error={error} />;
    }
    return (
      <>
        <Products products={data} />
        <Paginate pageCount={pageCount} />
        {/* <Cher /> */}
      </>
    );
  } catch (error) {
    throw error;
  }
};

export default Page;
