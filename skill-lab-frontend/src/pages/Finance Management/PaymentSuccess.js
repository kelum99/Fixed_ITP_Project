import React from "react";
import {Result,Button} from "antd";
import { Link } from "react-router-dom";

export default function Sucesses ()  {
    return(
        <>
    <Result
    status="success"
    title="Successfully Purchased!"
    subTitle="Order number: 2017182818828182881"
    extra={[
        <Link to="/home2">
      <Button type="primary" key="console">
        Home
      </Button> </Link>,
      <Link to="/UserView">
      <Button key="buy">Buy Again</Button></Link>
    ]}
  />
  </>
);
}