import { useState } from "react";
import { NewsList } from "./NewsList";
import { Pagination } from "./Pagination";
import Header from "./Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function FilterableNewsList() {
  const newsFeeds = useSelector((state: RootState) => state.newsFeeds);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const newsFeedsPerPage = 6;

  const firstNewsIndex = (currentPage - 1) * newsFeedsPerPage;
  const lastNewsIndex = firstNewsIndex + newsFeedsPerPage;
  const currentNewsFeeds = newsFeeds.slice(firstNewsIndex, lastNewsIndex);

  return (
    <>
      <Header />
      <NewsList sliceNewsFeeds={currentNewsFeeds} />
      <Paging>
        <Pagination
          newsFeedNum={newsFeeds.length}
          newsFeedsPerPage={newsFeedsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Paging>
    </>
  );
}

const Paging = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;
