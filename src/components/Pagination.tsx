import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Pagenate {
  newsFeedNum: number;
  newsFeedsPerPage: number;
  setCurrentPage: any;
  currentPage: number;
}

export function Pagination({
  newsFeedNum,
  newsFeedsPerPage,
  setCurrentPage,
  currentPage,
}: Pagenate) {
  const navigate = useNavigate();
  const pageList = [];
  const totalPages = Math.ceil(newsFeedNum / newsFeedsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (totalPages === 1) {
    return null;
  }

  return (
    <ButtonBox>
      <PrevButton onClick={goToPrevPage} disabled={currentPage === 1}>
        prev
      </PrevButton>
      <PageButtonBox>
        {pageList.map((page) => (
          <PageButton
            key={page}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </PageButton>
        ))}
      </PageButtonBox>

      <NextButton
        onClick={goToNextPage}
        disabled={currentPage === pageList.length}
      >
        next
      </NextButton>
    </ButtonBox>
  );
}

const ButtonBox = styled.div`
  display: flex;
  padding: 10px;
  min-width: 700px;
  align-items: center;
  justify-content: space-between;
`;

const PrevButton = styled.button`
  background-color: #d8d4d4;
  font-size: 30px;
  border-radius: 8px;
`;
const PageButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 400px;
`;
const PageButton = styled.button`
  background-color: #d8d4d4;
  font-size: 30px;
  border-radius: 8px;
`;

const NextButton = styled.button`
  background-color: #d8d4d4;
  font-size: 30px;
  border-radius: 8px;
`;
