import Refund from "@/component/refund/refund";

export const metadata = {
  title: "Refund",
  description: "Send  Refund Product Page",
};
const Page = async ({ params }) => {
  return (
    <>
      <Refund id={params.id} />;{/* <Error error={null} />; */}
    </>
  );
};

export default Page;
