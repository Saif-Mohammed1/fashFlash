import Link from "next/link";

const Page = async () => {
  // if (!searchParams.session_id) return;
  // const item = await fetchApi(
  //   "/stripe/checkout?session_id=" + searchParams.session_id,
  //   {
  //     headers: headers(),
  //   }
  // );

  return (
    // <Message
    //   data={item}
    //   message={"we have sent an invoice to you email"}
    //   redirect={true}
    // />

    <div className="h-[80vh] -mb-4 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Order Success</h1>
      <p className="text-lg text-gray-700">
        Thank you for your order! Your items will be shipped shortly.
      </p>
      <p className="text-lg text-gray-700 mt-2">
        If you encounter any issues or have questions, please feel free to{" "}
        <Link target="_blank" href="/contact-us">
          <span className="text-blue-600 hover:underline">contact us</span>
        </Link>
        .
      </p>

      <p className="text-lg text-gray-700 mt-2">
        You can view your orders{" "}
        <Link target="_blank" href="/account/my-orders">
          <span className="text-blue-600 hover:underline">here</span>
        </Link>
        .
      </p>
    </div>
  );
};

export default Page;
