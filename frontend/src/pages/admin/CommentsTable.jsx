//TODO Pages
import AdminSidebar from "./AdminSidebar";

//TODO Libraries
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

//TODO CSS Files
import "./admin-table.css";
import { useEffect } from "react";
import {
  deleteComment,
  fetchAllComments,
} from "../../redux/apiCalls/commentApiCall";
import { toast } from "react-toastify";

//TODO Main Function
const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  //TODO Functions
  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);
  //Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this Comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#F00A0A",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(commentId));
        toast.success("Comment has been Deleted Successfully");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.user?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.text}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
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

export default CommentsTable;
