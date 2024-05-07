import Report from "@/component/report/report";

export const metadata = {
  title: "Report",
  description: "Report page",
};
const page = ({ params }) => {
  return (
    <>
      <h2 className="text-center p-2 my-3 font-bold text-gray-700">
        What Is Your Issue....?
      </h2>
      <Report id={params.id} />
    </>
  );
};

export default page;
