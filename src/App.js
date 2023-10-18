import React, { useState } from "react";
import "./App.css";
import data from "./data.json"; // Assuming you have JSON data with a structure similar to your previous messages

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState(data.results.slice(0, 49));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startPoint = (currentPage - 1) * itemsPerPage;
  const endPoint = startPoint + itemsPerPage;

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = searchValue
    ? results.filter((item) => {
        const search = searchValue.toLowerCase();
        return (
          item.name.first.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search) ||
          item.location.country.toLowerCase().includes(search) ||
          item.gender.toLowerCase().includes(search) ||
          item.login.username.toLowerCase().includes(search)
        );
      })
    : results;

  const currentData = filteredData.slice(startPoint, endPoint);
  // const totalPages = filteredData.length / itemsPerPage;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const pageChange = (i) => {
    console.log(filteredData.length);
    console.log(totalPages);
    if (i >= 1 && i <= totalPages) {
      setCurrentPage(i);
    }
    // if (i !== 1 || i !== endPoint) {
    //   setCurrentPage(i);
    // }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by Name, Email, or Location"
        value={searchValue}
        onChange={onSearch}
      />{" "}
      &nbsp;
      <table className="table">
        <thead>
          <tr>
            <th>Gender</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.gender}</td>
              <td>{item.name.first}</td>
              <td>{item.location.country}</td>
              <td>{item.email}</td>
              <td>{item.login.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => pageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => pageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
