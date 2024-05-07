"use client";

import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Paginate = ({ pageCount }) => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  let queryString;
  const handlePageChange = (event, value) => {
    if (typeof window !== undefined)
      queryString = new URLSearchParams(window.location.search);

    if (parseInt(queryString.get("page")) === 1 || value === 1) {
      queryString.delete("page");
    } else if (queryString.has("page")) {
      queryString.set("page", value);
    } else {
      queryString.append("page", value);
    }
    setPage(value);

    const path = window.location.pathname + "?" + queryString.toString();
    router.push(path);
  };
  useEffect(() => {
    if (typeof window !== undefined)
      queryString = new URLSearchParams(window.location.search);
    if (
      searchParams.has("page") &&
      parseInt(searchParams.get("page")) <= pageCount
    ) {
      setPage(parseInt(searchParams.get("page")));
    } else if (!searchParams.has("page") && page <= pageCount && page !== 1) {
      queryString.append("page", page);
    } else {
      queryString.delete("page");
    }

    const path = `${window.location.pathname}?${queryString.toString()}`;
    //console.log("path window.location.pathname", path);
    router.push(path);
  }, [pageCount, searchParams?.has("page")]);
  return (
    <Pagination
      count={pageCount}
      page={page}
      onChange={handlePageChange}
      sx={{ display: "flex", justifyContent: "center", my: "30px" }}
      showFirstButton
      showLastButton
      color="primary"
      className="m-0 "
    />
  );
};

export default Paginate;
