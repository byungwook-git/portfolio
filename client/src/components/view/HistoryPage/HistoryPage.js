import React from "react";

function HistoryPage(props) {
  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>상품명(ID)</th>
            <th>가격</th>
            <th>수량</th>
            <th>날짜</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name}({item.id})
                </td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.dateOfPurchase}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
