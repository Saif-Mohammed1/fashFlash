import Message from "@/component/message/message";
import ProductItem from "@/component/product/product-Item/product-Item";
import fetchApi from "@/component/util/fetchApi";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata = {
  title: "My Products ",
  description: "My Products Page",
};
const getData = async () => {
  try {
    const { data, error } = await fetchApi("/user/product", {
      headers: headers(),
    });

    if (error) {
      throw error;
    }

    return data?.data;
  } catch (error) {
    return <Message error={error} />;
  }
};
const Page = async () => {
  /*} else {
    // If there are no favorites, show a message and link to shop
    return (
      <div className="flex text-center min-h-[90vh] flex-col justify-center p-4">
        <p className="text-gray-600 font-bold">
          Your Favorite item is empty. if you are not login you could lose your
          data anytime please login to access your data anytime
        </p>
        <Link href="/" className=" font-bold">
          Back To Shop
        </Link>
      </div>
    );
  }
};};

export default Page;

 */
  const products = await getData();
  return (
    <section>
      {/* <Link
        href={""}
        className=" bg-blue-500 hover:bg-blue-500 p-4 mt-3 text-center"
      >
        Add New Product
      </Link>{" "} */}
      <div className="grid col p-5 m-5">
        {products &&
          products.map((product) => {
            return <ProductItem product={product} key={product._id} />;
          })}
      </div>
    </section>
  );
};
export default Page;
