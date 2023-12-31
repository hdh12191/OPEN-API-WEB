import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import {
  addFavoriteList,
  deleteFavoriteList,
  favoriteToggle,
} from "../store/slice/favoriteSlice";
import { deleteNewsFeed, feedToggle } from "../store/slice/newsFeedsSlice";
import { RootState } from "../store/store";
import NewsFeed from "./NewsList";

export default function NewsDetail() {
  const newsFeeds = useSelector((state: RootState) => state.newsFeeds);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const newsId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavoriteButtonOn = (feeds: NewsFeed[]) => {
    for (let i = 0; i < feeds.length; i++) {
      if (feeds[i].id === Number(newsId)) {
        return feeds[i].isFavoriteButtonOn;
      }
    }
  };

  const getFeed = (feeds: NewsFeed[]) => {
    for (let i = 0; i < feeds.length; i++) {
      if (feeds[i].id === Number(newsId)) {
        return feeds[i];
      }
    }
  };

  const getTitle = (feeds: NewsFeed[]) => {
    for (let i = 0; i < feeds.length; i++) {
      if (feeds[i].id === Number(newsId)) {
        return feeds[i].title;
      }
    }
  };

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
            <NewsContentBox>
              <NewsContentStyle>
                <NewsContentTitle>{getTitle(newsFeeds)}</NewsContentTitle>
                <ul>
                  {newsFeeds.map((feed) => (
                    <Comment key={feed.id}>
                      <UserName>Username : {feed.user}</UserName>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </Comment>
                  ))}
                </ul>
                <ButtonBox>
                  <FavoriteButton
                    onClick={() => {
                      isFavoriteButtonOn(newsFeeds);
                      if (isFavoriteButtonOn(newsFeeds) === false) {
                        dispatch(addFavoriteList(getFeed(newsFeeds)));
                        dispatch(favoriteToggle(Number(newsId)));
                        dispatch(feedToggle(Number(newsId)));
                      } else {
                        dispatch(deleteFavoriteList(Number(newsId)));
                        dispatch(favoriteToggle(Number(newsId)));
                        dispatch(feedToggle(Number(newsId)));
                      }
                    }}
                  >
                    {isFavoriteButtonOn(newsFeeds)
                      ? "즐겨찾기해제"
                      : "즐겨찾기등록"}
                  </FavoriteButton>
                  <DeleteNewsFeedButton
                    onClick={() => {
                      dispatch(deleteNewsFeed(Number(newsId)));
                      dispatch(deleteFavoriteList(Number(newsId)));
                      navigate("/newslist");
                      window.scrollTo(0, 0);
                    }}
                  >
                    삭제
                  </DeleteNewsFeedButton>
                </ButtonBox>
              </NewsContentStyle>
            </NewsContentBox>
          )}
        </>
      )}
    </>
  );
}

const NewsContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;
const NewsContentTitle = styled.h1`
  margin-left: 40px;
`;
const NewsContentStyle = styled.div`
  width: 85%;
  background-color: white;
  border-radius: 20px;
  margin: 20px;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 10px 20px;
`;
const FavoriteButton = styled.button`
  padding: 10px;
  margin-right: 40px;
`;
const DeleteNewsFeedButton = styled.button`
  padding: 10px;
`;
const UserName = styled.p`
  color: #8a3b3b;
`;

const Comment = styled.li`
  list-style-type: none;
  padding: 10px;
  border-top: 1px solid gray;
  margin: 10px;

  &:last-child {
    border-bottom: 1px solid gray;
  }
`;
