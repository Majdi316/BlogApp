//TODO Libraries
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";
//TODO CSS File
import "./post-details.css";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModel from "./UpdatePostModel";

//TODO Main Function
const PostDetails = () => {
  //TODO Variables
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  //TODO Functions
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  //Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!!!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };
  const navigate = useNavigate();
  //Delete Post Handler
  const deletePostHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          alt=""
          src={file ? URL.createObjectURL(file) : post?.image.url}
          className="post-details-image"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">{post?.description}</p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}

          <small>{post?.likes.length} Likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          {" "}
          to write a comment you should login first
        </p>
      )}

      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
