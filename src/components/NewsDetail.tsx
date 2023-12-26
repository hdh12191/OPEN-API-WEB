import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";

interface NewsContent {
  id: string;
  title: string;
  points?: number | null;
  user: string | null;
  time?: number;
  time_ago?: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type?: string;
  url?: string;
  domain?: string;
  comments?: NewsContent[];
  level?: number;
  comments_count?: number;
}

export default function NewsDetail() {
  const [newsContents, setNewsContent] = useState<NewsContent>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const newsId = params.id;

  useEffect(() => {
    try {
      const getNewsContents = async () => {
        const newsContents = await axios.get(
          `https://api.hnpwa.com/v0/item/${newsId}.json`
        );
        setNewsContent(newsContents.data);
        setLoading(false);
      };
      getNewsContents();
    } catch (e) {
      console.log(e);
    }
  }, [newsId]);


  return (
    <NewsContentBox>
      {loading ? (
        <Loader />
      ) : (
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
        </NewsContentStyle>
      )}
    </NewsContentBox>
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
const UserName = styled.p`
  color: #8a3b3b;
`;

const Comment = styled.li`
  list-style-type: none;
  padding: 10px;
  border-top: 1px solid gray;
  margin: 10px;
`;
