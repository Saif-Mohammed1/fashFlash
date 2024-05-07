import AddProduct from "@/component/product/add-product/add-product";

export const metadata = {
  title: "Add New Products ",
  description: "Add New Products Page",
};
const Page = () => {
  return <AddProduct bg={false} />;
};

export default Page;
