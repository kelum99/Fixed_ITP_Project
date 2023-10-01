import "./App.css";
import MainRouter from "./MainRouter";
import Header from "../src/components/Header";
import {  BrowserRouter as Router } from "react-router-dom";
import { RequestContextProvider } from "./services/RequestContext";
import { UserContextProvider } from "./services/UserContext";

function App() {
  return (
    <>
    <RequestContextProvider baseURL={"http://localhost:4000/api/"}>
    <UserContextProvider>
      <Router>
        <Header />
        <MainRouter /> 
      </Router>
      </UserContextProvider>
    </RequestContextProvider>
</>
  );
}
export default App;
