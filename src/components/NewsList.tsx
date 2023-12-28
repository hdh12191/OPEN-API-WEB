import { Link } from "react-router-dom";
import styled from "styled-components";
import { User } from "@styled-icons/boxicons-solid/User";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Clock } from "@styled-icons/bootstrap/Clock";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteList } from "../store/slice/favoriteSlice";
import { RootState } from "../store/store";

export default interface NewsFeed {
  comments_count: number;
  id: number;
  points: number;
  time_ago: string;
  title: string;
  user: string;
}

export function NewsList({ sliceNewsFeeds }: any) {
  let newsFeed = useSelector((state: RootState) => {
    return state.newsFeeds;
  });
  const dispatch = useDispatch();

  newsFeed = [...sliceNewsFeeds];

  return (
    <NewsFeedBox>
      {newsFeed.map((newsFeed: NewsFeed, index: number) => (
        <NewsFeeds key={index}>
          <FavoriteButtonBox>
            <NewsFeedStyle to={`/newsdetail/${newsFeed.id}`}>
              {newsFeed.title}({newsFeed.comments_count})
            </NewsFeedStyle>
            <button
              onClick={() => {
                dispatch(
                  addFavoriteList({
                    id: newsFeed.id,
                    title: newsFeed.title,
                    time_ago: newsFeed.time_ago,
                    user: newsFeed.user,
                    points: newsFeed.points,
                    comments_count: newsFeed.comments_count,
                  })
                );
              }}
            >
              즐겨찾기등록
            </button>
          </FavoriteButtonBox>

          <NewsFeedIconBox>
            <NewsFeedIcon>
              <User size="24" />
              {newsFeed.user}
            </NewsFeedIcon>
            <NewsFeedIcon>
              <Heart size="24" />
              {newsFeed.points}
            </NewsFeedIcon>
            <NewsFeedIcon>
              <Clock size="20" />
              {newsFeed.time_ago}
            </NewsFeedIcon>
          </NewsFeedIconBox>
        </NewsFeeds>
      ))}
    </NewsFeedBox>
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

const FavoriteButton = styled.button`
  border: 1px solid #7a6a5c;
  background-color: #cabaac;
  border-radius: 10px;

  &:hover {
    font-size: 18px;
  }
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
