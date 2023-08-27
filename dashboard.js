import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";

function DashBoard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // ----------------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  };
  // ----------------------------------------------------------------------------
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteUser/${id}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage or wherever you store it
      if (!token) {
        setTokenMissing(true);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        `http://localhost:3000/admin/getUsersList`
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Pagination logic ...
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      {tokenMissing ? (
        <div className="error-message">
          <p>You need to log in to access the dashboard.</p>
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
      ) : (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((ele) => (
                <tr key={ele._id}>
                  <td>{ele.username}</td>
                  <td>{ele.email}</td>
                  <td>
                    <a onClick={() => deleteUser(ele._id)}>
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination buttons ... */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastUser >= data.length}
            >
              Next
            </button>
          </div>

          <button className="mt-5" onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
