import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <div>
        <Logo to="/newslist">Hacker News</Logo>
      </div>
      
      <FavoriteList to="/favoriteslist">Favorite List</FavoriteList>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  margin: 10px;
  padding: 10px;
`;

const Logo = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 30px;
  font-weight: 600;
  margin-left: 10px;
`;

const FavoriteList = styled(Link)`
  color: #686161;
  text-decoration: none;
  font-weight: 600;
  font-size: 30px;
  margin-right: 20px;

  &:hover {
    color: black;
  }
`;


