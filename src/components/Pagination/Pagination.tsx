import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;

  @media (max-width: 600px) {
    display: grid;
    grid-template-areas: "prev next" "pages pages";
  }
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
  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
  }
  transition-property: background-color;
  transition-duration: 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.color.disabled};
  }
`;

const MAX_VISIBLE_PAGES_DESKTOP = 7;
const MAX_VISIBLE_PAGES_MOBILE = 5;

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
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const maxVisiblePages = isTabletOrMobile
    ? MAX_VISIBLE_PAGES_MOBILE
    : MAX_VISIBLE_PAGES_DESKTOP;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return [...Array.from({ length: totalPages }, (_, index) => index + 1)];
    }
    if (currentPage - 1 <= halfMaxVisiblePages) {
      return [
        ...Array.from({ length: maxVisiblePages - 2 }, (_, index) => index + 1),
        "BACK_DOTS",
        totalPages,
      ];
    }
    if (currentPage >= totalPages - halfMaxVisiblePages) {
      return [
        1,
        "FRONT_DOTS",
        ...Array.from(
          { length: maxVisiblePages - 2 },
          (_, index) => totalPages - (maxVisiblePages - 2) + index + 1
        ),
      ];
    }
    return [
      1,
      "FRONT_DOTS",
      ...Array.from(
        { length: maxVisiblePages - 4 },
        (_, index) => currentPage - halfMaxVisiblePages + 2 + index
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
        style={{
          gridArea: "prev",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          height="1.3rem"
          width="1.3rem"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </ArrowStyled>
      <BulletsContainerStyled
        style={{
          gridArea: "pages",
        }}
      >
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
        style={{
          gridArea: "next",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          height="1.3rem"
          width="1.3rem"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </ArrowStyled>
    </Container>
  );
};

export default Pagination;
