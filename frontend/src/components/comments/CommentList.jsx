//TODO Libraries
import Swal from "sweetalert2";
import { useState } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";

//TODO CSS Files
import "./comment-list.css";
import UpdateCommentModel from "./UpdateCommentModel";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";
import { toast } from "react-toastify";

//TODO Main Function
const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  //Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };
  //Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
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
        dispatch(deleteComment(commentId));
        toast.success("the comment has been Deleted");
      } else {
        Swal.fire({
          text: "something went wrong",
        });
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment.username}</div>
            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}
              ago
            </div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          {user?._id === comment.user && (
            <div className="comment-item-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModel
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
