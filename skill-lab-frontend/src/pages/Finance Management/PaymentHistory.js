import React from "react";
import { Table, Tag } from "antd";
import "./stylesFinance.css";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

function PaymnetHistory() {
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentID",
      key: "paymentID"
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    }
  ];

  const data = [
    {
      key: "1",
      paymentID: "P525667",
      reason: "Purchase a java springboot course",
      status: "Completed",
      amount: "50$",
      date: "2021-05-12"
    },
    {
      key: "2",
      paymentID: "P725665",
      reason: "Purchase a ebook about react",
      status: "Completed",
      amount: "20$",
      date: "2021-07-22"
    },   
    {
      key: "3",
      paymentID: "P848752",
      reason: "Buy web-template about hotel mangement",
      status: "Completed",
      amount: "200$",
      date: "2021-08-02"
    }
  ];

  return (
    <div className="main-container-paymentHistory">
      <h1>My Payment History</h1>

      <div className="paymentHistory-table">
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>

      <div className="issue">
      <span > Have any issue with your payments ?
        <Link to="/contactUs"> Contact Us </Link>
      </span>
      </div>
    </div>
  );
}

export default PaymnetHistory;
