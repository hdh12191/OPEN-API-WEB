import { useEffect, useState } from "react";
import { NewsList } from "./NewsList";
import { Pagination } from "./Pagination";
import Header from "./Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "./Loader";
import Error from "./Error";

export function FilterableNewsList() {
  const newsFeeds = useSelector((state: RootState) => state.newsFeeds);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const newsFeedsPerPage = 6;

  useEffect(() => {
    try {
      setLoading(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Header />
              <NewsList
                currentPage={currentPage}
                newsFeedsPerPage={newsFeedsPerPage}
              />
              <Paging>
                <Pagination
                  newsFeedNum={newsFeeds.length}
                  newsFeedsPerPage={newsFeedsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </Paging>
            </>
          )}
        </>
      )}
    </>
  );
}

const Paging = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;
