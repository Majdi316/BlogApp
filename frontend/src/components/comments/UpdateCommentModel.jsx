//TODO Libraries
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

//TODO CSS Files

//TODO Main Function
const UpdateCommentModel = ({ setUpdateComment, commentForUpdate }) => {
  //TODO Variables
  const [text, setText] = useState(commentForUpdate?.text);
  const dispatch = useDispatch();

  //TODO Functions
  //Update Comment Handler
  const updateCommentHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateComment(commentForUpdate?._id, { text }));
        setUpdateComment(false);
        toast.success("the comment has been Updated");
      } else {
        Swal.fire({
          text: "something went wrong",
        });
      }
    });
  };

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write a comment");

    updateCommentHandler();
  };

  return (
    <div className="update-model">
      <form onSubmit={formSubmitHandler} className="update-model-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-model-form-close"
          ></i>
        </abbr>
        <h1 className="update-model-title">Edit Comment</h1>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="update-model-input"
        />

        <button className="update-model-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModel;
