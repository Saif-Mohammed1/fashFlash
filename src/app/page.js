import Home from "@/component/home/home";
import Message from "@/component/message/message";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";
const queryParams = async (searchParams) => {
  const url = new URLSearchParams();

  // Append each parameter only if it's not undefined
  if (searchParams.category !== undefined) {
    url.append("category", searchParams.category);
  }
  if (searchParams.name !== undefined) {
    url.append("name", searchParams.name);
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
    const { data, error } = await fetchApi(`/product?${queryString}`, {
      headers: headers(),
    });

    if (error) throw error;

    return {
      data: data?.data || [],
      pageCount: data?.pageCount,
      categories: data?.categories,
    };
  } catch (error) {
    return { error };
  }
};

export default async function Root({ searchParams }) {
  try {
    const { data, pageCount, categories, error } = await queryParams(
      searchParams
    );
    const products = data;
    if (error) {
      return <Message error={error} />;
    }
    // const categories = [...new Set(products.map((item) => item.category))];

    return (
      // <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>

      <Home
        products={products}
        categories={categories}
        pageCount={pageCount}
        //  fav={fav}
      />
    );
  } catch (error) {
    throw error;
  }
}
