import Link from "next/link";
export const metadata = {
  title: "Order Canceled - My Products",
  description:
    "Your order has been canceled. Contact us for further assistance.",
};

const CancelPage = () => {
  return (
    <div className="h-[80vh] -mb-4 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Order Canceled</h1>
      <p className="text-lg text-gray-700">
        Your order has been canceled. If you have any questions, please{" "}
        <Link href="/contact-us" target="_blank">
          <span className="text-blue-600 hover:underline">contact us</span>
        </Link>
        .
      </p>
    </div>
  );
};

export default CancelPage;
