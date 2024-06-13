import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationNav = ({ currentPage, pages, setCurrentPage }) => {
  const [pageItems, setPageItems] = useState([]);
  for (let index = 0; index < pages; index++) {
    if (index + 1 === currentPage - 1) {
      <PaginationItem key={index}>
        <PaginationPrevious href="#" onClick={setCurrentPage(index + 1)} />
      </PaginationItem>;
    } else {
      pageItems.push(
        <PaginationItem key={index}>
          <PaginationLink href="#" onClick={setCurrentPage(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }
  }
  return (
    <Pagination>
      <PaginationContent>
        {pageItems}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationNav;
