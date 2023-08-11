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
      <br>
      </br>
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
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-style: solid;
  border-width: 2px;
  svg{
    font-size: 2rem;
  }
   
  background: linear-gradient(to right, #f27121, #e94057);
  border-radius: 15px;
`
export default App;