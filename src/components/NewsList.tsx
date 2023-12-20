import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { User } from "@styled-icons/boxicons-solid/User";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Clock } from "@styled-icons/bootstrap/Clock";

interface NewsFeed {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
}

export default function NewsList() {
  const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
  const [newsFeeds, setNewsFeeds] = useState<NewsFeed[]>([]);

  useEffect(() => {
    const getNewsFeed = async () => {
      const newsFeeds = await axios.get<NewsFeed[]>(NEWS_URL);
      setNewsFeeds(newsFeeds.data);
    };
    getNewsFeed();
  }, []);

  console.log(newsFeeds);

  return (
    <NewsFeedBox>
      {newsFeeds.map((newsFeed: NewsFeed, index: number) => {
        if (index && index < newsFeeds.length) {
          return (
            <NewsFeeds key={newsFeed.id}>
              <NewsFeed to={`/newsdetail/${newsFeed.id}`}>
                {newsFeed.title}({newsFeed.comments_count})
              </NewsFeed>
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
          );
        }
      })}
    </NewsFeedBox>
  );
}

const NewsFeedBox = styled.div`
  background-color: gray;
  max-width: 100%;
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

const NewsFeed = styled(Link)`
  text-decoration: none;
  color: #464141;
  font-weight: 500;
  align-items: center;
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
