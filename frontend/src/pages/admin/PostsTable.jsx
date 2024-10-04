//TODO Pages
import AdminSidebar from "./AdminSidebar";

//TODO Libraries
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

//TODO CSS Files
import "./admin-table.css";
import { useEffect } from "react";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCall";

//TODO Main Function
const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  //TODO Functions
  //Delete Post Handler
  const deletePostHandler = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#F00A0A",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(postId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.user?.profilePhoto.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>View Post</Link>
                    </button>
                    <button onClick={() => deletePostHandler(item._id)}>
                      Delete Post
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

export default PostsTable;
