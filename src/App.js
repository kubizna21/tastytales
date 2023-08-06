import Pages from "./pages/Pages";
import Tages from "./componemts/Tages";
import { BrowserRouter } from 'react-router-dom'
import Search from "./componemts/Search";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Search />
     <Tages />
     <Pages />
     </BrowserRouter>
    </div>
  );
}

export default App;
