import styled from "@emotion/styled";
import React, { useMemo } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const BulletsContainerStyled = styled.div`
  padding: 0;
  display: flex;
  gap: 10px;
`;

const BulletPageStyled = styled.button`
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &.interactive-page {
    cursor: pointer;
  }

  &.interactive-page:hover {
    background-color: #eee;
    transition-property: background-color;
    transition-duration: 0.2s;
  }

  &.active {
    background-color: ${(props) => props.theme.color.primary};
    color: white;
    font-weight: bold;
  }
`;

const ArrowStyled = styled.button`
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  opacity: 1;
  transition-property: background-color;
  transition-duration: 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.color.disabled};
  }
`;

const MAX_VISIBLE_PAGES = 7;
const HALF_MAX_VISIBLE_PAGES = Math.floor(MAX_VISIBLE_PAGES / 2);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  disabled,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visiblePages = useMemo(() => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return [...Array.from({ length: totalPages }, (_, index) => index + 1)];
    }
    if (currentPage - 1 <= HALF_MAX_VISIBLE_PAGES) {
      return [
        ...Array.from(
          { length: MAX_VISIBLE_PAGES - 2 },
          (_, index) => index + 1
        ),
        "BACK_DOTS",
        totalPages,
      ];
    }
    if (currentPage >= totalPages - HALF_MAX_VISIBLE_PAGES) {
      return [
        1,
        "FRONT_DOTS",
        ...Array.from(
          { length: MAX_VISIBLE_PAGES - 2 },
          (_, index) => totalPages - (MAX_VISIBLE_PAGES - 2) + index + 1
        ),
      ];
    }
    return [
      1,
      "FRONT_DOTS",
      ...Array.from(
        { length: MAX_VISIBLE_PAGES - 4 },
        (_, index) => currentPage - HALF_MAX_VISIBLE_PAGES + 2 + index
      ),
      "BACK_DOTS",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  return (
    <Container>
      <ArrowStyled
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        {"<"}
      </ArrowStyled>
      <BulletsContainerStyled>
        {visiblePages.map((page) => {
          let className = "";
          if (currentPage === page) {
            className += "active";
          }
          if (currentPage !== page && typeof page === "number") {
            className += " interactive-page";
          }

          return (
            <BulletPageStyled
              key={page}
              disabled={disabled}
              data-testid={page}
              onClick={() =>
                typeof page === "number" ? handlePageChange(page) : null
              }
              className={className}
            >
              {page === "FRONT_DOTS" || page === "BACK_DOTS" ? "..." : page}
            </BulletPageStyled>
          );
        })}
      </BulletsContainerStyled>
      <ArrowStyled
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
      >
        {">"}
      </ArrowStyled>
    </Container>
  );
};

export default Pagination;
