import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { User } from "@styled-icons/boxicons-solid/User";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Clock } from "@styled-icons/bootstrap/Clock";
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import styled from "styled-components";

export default function FavoritesList() {
  const favoriteList = useSelector((state: RootState) => state.favrioiteList);
  const dispatch = useDispatch();

  console.log(favoriteList)
  return (
    <NewsFeedBox>
      {favoriteList.map(({ id, title, time_ago, points, user }) => (
        <NewsFeeds key={id}>
          <FavoriteButtonBox>
            <NewsFeedStyle to={`/newsdetail/${id}`}>{title}</NewsFeedStyle>
            <button>
              <StarFill size="30" color="#a4a795" />
            </button>
          </FavoriteButtonBox>

          <NewsFeedIconBox>
            <NewsFeedIcon>
              <User size="24" />
              {user}
            </NewsFeedIcon>
            <NewsFeedIcon>
              <Heart size="24" />
              {points}
            </NewsFeedIcon>
            <NewsFeedIcon>
              <Clock size="20" />
              {time_ago}
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
