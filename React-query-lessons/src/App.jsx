import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import Character from "./components/Character";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Rick and Morty</h1>
        <QueryClientProvider client={queryClient}>
          <Character />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
