import logo from './logo.svg';
import './App.css';
import react from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './components/restaurant'
import restaurants from './components/restaurant';

function App() {
  return (
    <>
       <div className="App"> 
      <h1>GOOD FOOD IS HAPPY LIFE</h1>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">About</a>
            <a class="nav-item nav-link" href="#">Restaurants</a>
            <a class="nav-item nav-link disabled" href="#">Reviews</a>
          </div>
        </div>
      </nav>
      <div class = "container mt-3">
        <switch>
          <route exact-path = {["/","/restaurants"]} component ={restaurants}>
          <route 
            path="/restaurants"
            render={(props) => (
              <restaurants {...props} />
            )}
          />
          </route>
        </switch>
      </div>
    </div>
    </>
  );
}

export default App;
