import { getStatusColor } from "@/component/util/GeneralData";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Link from "next/link";
const Notes = ({
  //data = [],
  title = "Notes",
  note = false,
}) => {
  const data = [
    //     // Comment or uncomment items to test empty data
    { invoiceId: 8247, status: "completed" },
    { invoiceId: 58916, status: "processing" },
    { invoiceId: 45776, status: "failed" },
    { invoiceId: 9255, status: "processing" },
    { invoiceId: 5015, status: "pending" },
    { invoiceId: 49201, status: "failed" },
    { invoiceId: 39970, status: "failed" },
    { invoiceId: 40000, status: "pending" },
    { invoiceId: 69946, status: "completed" },
    { invoiceId: 21124, status: "processing" },
  ];

  if (data.length === 0) {
    // If no data, display a message
    return (
      <div className="container">
        <h3 className="my-1 text-center text-gray-400 text-2xl font-bold">
          My {title}
        </h3>
        <div className="flex justify-center items-center h-[78vh]">
          <p className="text-lg text-gray-500">There are no {title} yet.</p>
        </div>
      </div>
    );
  }

  // Normal rendering when there are orders
  return (
    <>
      <h3 className="my-1 text-center text-gray-400 text-2xl font-bold">
        My {title}
      </h3>
      <div className="container p-2">
        <div className="flex flex-col text-center">
          <div className="flex mb-2 bg-gray-100 -shadow-md rounded py-1">
            <span className="font-bold w-2/6">Num</span>
            <span className="font-bold w-3/6">Receipt ID</span>
            {title === "Orders" ? (
              <span className="font-bold w-1/6">Issue</span>
            ) : null}
            <span className="font-bold w-2/6">Status</span>
          </div>
          <div className="flex flex-col text-center  h-[60vh] overflow-y-auto">
            {data.map((item, index) => (
              <div key={index} className="flex py-1 bg-gray-100 mb-3 rounded">
                <span className="w-2/6">{index + 1} #</span>
                <a href="#" className="w-3/6">
                  {item.invoiceId}
                </a>
                {title === "Orders" ? (
                  <span className={`w-1/6 py-1 -my-1 text-gray-500 `}>
                    <Link
                      href={"/note/" + item.invoiceId}
                      className="hover:text-gray-700 "
                    >
                      <EditNoteIcon />
                    </Link>
                  </span>
                ) : null}
                <span
                  className={`w-2/6 py-1 -my-1 ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="float-right p-3 my-2 bg-blue-500 hover:bg-blue-600 text-white  rounded">
          Open New Note
        </button>
      </div>
    </>
  );
};

export default Notes;
