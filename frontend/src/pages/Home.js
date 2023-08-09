
import Populer from "../api/Populer";
import ShowRecipeList from "../components/ShowRecipeList";

function Home() {
    return (
      <div> 
          <Populer />
          <ShowRecipeList />
      </div>
    )
    }
  export default Home;