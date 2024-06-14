import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Asegúrate de que la ruta es correcta

const PaginationNav = ({ currentPage, pages, setCurrentPage }) => {
  const createPageItems = () => {
    const pageItems = [];
    for (let index = 1; index <= pages; index++) {
      pageItems.push(
        <PaginationItem key={index} >
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(index);
            }}
          >
            {index}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageItems;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </PaginationPrevious>
        )}
        {createPageItems()}
        {currentPage < pages && (
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </PaginationNext>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationNav;
