import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import {
  addFavoriteList,
  deleteFavoriteList,
} from "../store/slice/favoriteSlice";
import { deleteNewsFeed } from "../store/slice/newsFeedsSlice";

interface NewsContent {
  id: number;
  title: string;
  points?: number | null;
  user: string | null;
  time_ago?: string;
  content: string;
  domain?: string;
  comments?: NewsContent[];
  comments_count?: number;
}

export default function NewsDetail() {
  const [newsContents, setNewsContent] = useState<NewsContent>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const newsId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getNewsContents = async () => {
        setLoading(true);
        const newsContents = await axios.get(
          `https://api.hnpwa.com/v0/item/${newsId}.json`
        );
        setNewsContent(newsContents.data);
      };
      getNewsContents();
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [newsId]);

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
                <NewsContentTitle>{newsContents?.title}</NewsContentTitle>
                <ul>
                  {newsContents?.comments?.map((comment) => (
                    <Comment key={comment.id}>
                      <UserName>Username : {comment.user}</UserName>
                      <p>{comment.content.replace("<p>", "")}</p>
                    </Comment>
                  ))}
                </ul>
                <ButtonBox>
                <FavoriteButton
                  onClick={() => {
                    dispatch(
                      addFavoriteList({
                        id: newsContents?.id,
                        title: newsContents?.title,
                        time_ago: newsContents?.time_ago,
                        user: newsContents?.user,
                        points: newsContents?.points,
                        comments_count: newsContents?.comments_count,
                      })
                    );
                  }}
                >
                  즐겨찾기등록
                </FavoriteButton>
                <DeleteNewsFeedButton
                  onClick={() => {
                    dispatch(deleteNewsFeed(newsContents?.id));
                    dispatch(deleteFavoriteList(newsContents?.id));
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
`
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
