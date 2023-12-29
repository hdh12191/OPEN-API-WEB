import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { User } from "@styled-icons/boxicons-solid/User";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Clock } from "@styled-icons/bootstrap/Clock";
import { deleteFavoriteList } from "../store/slice/favoriteSlice";
import { Pagination } from "./Pagination";
import { useState } from "react";
import styled from "styled-components";
import { toggleOff, toggleOn } from "../store/slice/newsFeedsSlice";

export default function FavoritesList() {
  const favoriteList = useSelector((state: RootState) => state.favrioiteList);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const newsFeedsPerPage = 6;
  const firstNewsIndex = (currentPage - 1) * newsFeedsPerPage;
  const lastNewsIndex = firstNewsIndex + newsFeedsPerPage;
  const currentFavoriteList = favoriteList.slice(firstNewsIndex, lastNewsIndex);

  console.log(favoriteList);

  return (
    <>
      <NewsFeedBox>
        {currentFavoriteList.map((favorite) => (
          <NewsFeeds key={favorite.id}>
            <FavoriteButtonBox>
              <NewsFeedStyle to={`/newsdetail/${favorite.id}`}>
                {favorite.title}({favorite.comments_count})
              </NewsFeedStyle>
              <button
                onClick={() => {
                  dispatch(deleteFavoriteList(favorite.id));
                }}
              >
                즐겨찾기해제
              </button>
            </FavoriteButtonBox>

            <NewsFeedIconBox>
              <NewsFeedIcon>
                <User size="24" />
                {favorite.user}
              </NewsFeedIcon>
              <NewsFeedIcon>
                <Heart size="24" />
                {favorite.points}
              </NewsFeedIcon>
              <NewsFeedIcon>
                <Clock size="20" />
                {favorite.time_ago}
              </NewsFeedIcon>
            </NewsFeedIconBox>
          </NewsFeeds>
        ))}
      </NewsFeedBox>
      <Paging>
        <Pagination
          newsFeedNum={favoriteList.length}
          newsFeedsPerPage={newsFeedsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Paging>
    </>
  );
}

const NewsFeedBox = styled.div`
  background-color: gray;
  padding: 4px;
`;

const NewsFeeds = styled.div`
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  font-size: 40px;
  font-weight: 200;
  background-color: white;
  transition: 0.5s;
  &:hover {
    background-color: #95db95;
  }
`;

const NewsFeedStyle = styled(Link)`
  text-decoration: none;
  color: #464141;
  font-weight: 500;
  align-items: center;
`;

const FavoriteButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NewsFeedIconBox = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(3, minmax(0, 0.1fr));
  color: #312e2e;
`;

const NewsFeedIcon = styled.div`
  margin-right: 1px;
  font-size: 24px;
  font-weight: 400;
`;

const Paging = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;
