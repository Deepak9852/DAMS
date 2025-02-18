import React, { useContext } from "react";
import "./dataDisplay.css";
import "../Header/Header";
import UserContext from "../context/userContext";

export function DataDisplay() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="dataBox">
        <h2>Counsellor Data : {user} </h2>
        <div className="dataTable">
          <table>
            <tr>
              <td>TOTAL NUMBER OF CALLS</td>
              <td></td>
            </tr>
            <tr>
              <td>ACTIVE CALLS</td>
              <td></td>
            </tr>
            <tr>
              <td>INTERESTED </td>
              <td></td>
            </tr>
            <tr>
              <td>TOTAL VISIT</td>
              <td></td>
            </tr>
            <tr>
              <td>ADDMISSION</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
