import Search from "./api/Search";
import Tags from "./api/Tages";
import Pages from "./pages/Pages";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo to={'/'}>Home</Logo>
      </Nav>
      <Search />
      <Tags />
     <Pages />
     </BrowserRouter>
    </div>
  );
}
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster two', cursive;
`
const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
`
export default App;
