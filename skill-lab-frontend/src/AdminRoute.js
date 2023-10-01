import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AdminHome from "../src/pages/Authentication Management/adminHome"

function AdminRouter() {
    return (
    <>
        <Route path="/adminHome" exact component={ AdminHome } />
    </>
    );
}
export default AdminRouter;