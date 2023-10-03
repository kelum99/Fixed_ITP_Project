import "./App.css";
import MainRouter from "./MainRouter";
import Header from "../src/components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { RequestContextProvider } from "./services/RequestContext";
import { UserContextProvider } from "./services/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="401828429661-g533emei022eh6lbimiqu6sdsq8shu3o.apps.googleusercontent.com">
        <RequestContextProvider baseURL={"http://localhost:4000/api/"}>
          <UserContextProvider>
            <Router>
              <Header />
              <MainRouter />
            </Router>
          </UserContextProvider>
        </RequestContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}
export default App;
