// import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import User from "./components/User";
import RecentRecipes from "./components/RecentRecipes";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="px-20 flex justify-start items-start">
        <User />
      </div>
      <div className="flex flex-col  justify-center items-center ">
        <RecipeList />
        {/* <RecentRecipes /> */}
      </div>
    </div>
  );
}

export default App;
