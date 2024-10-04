//TODO Pages
import AdminSidebar from "./AdminSidebar";

//TODO Libraries
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

//TODO CSS Files
import "./admin-table.css";
import { useEffect } from "react";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCall";

//TODO Main Function
const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  //TODO Functions
  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [dispatch, isProfileDeleted]);
  //Delete Account Handler
  const deleteAccountHandler = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#F00A0A",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(userId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteAccountHandler(item._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
