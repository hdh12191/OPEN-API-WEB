import { useEffect, useState } from "react";
import { NewsList } from "./NewsList";
import { Pagination } from "./Pagination";
import NEWS_URL from "../apis/newsFeedApi";
import Header from "./Header";
import axios from "axios";
import styled from "styled-components";



export function FilterableNewsList() {
  const [newsFeeds, setNewsFeeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsFeedsPerPage = 6;

  useEffect(() => {
    try {
      const getNewsFeeds = async () => {
        const newsFeeds = await axios.get(NEWS_URL);
        setNewsFeeds(newsFeeds.data);
        console.log(newsFeeds.data);
      };
      getNewsFeeds();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const firstNewsIndex = (currentPage - 1) * newsFeedsPerPage;
  const lastNewsIndex = firstNewsIndex + newsFeedsPerPage;
  const currentNewsFeeds = newsFeeds.slice(firstNewsIndex, lastNewsIndex);

  return (
    <>
      <Header />

      <NewsList SliceNewsFeeds={currentNewsFeeds} />
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

` 