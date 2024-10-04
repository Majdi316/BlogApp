//TODO CSS Files
import "./add-comment.css";

//TODO Libraries
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

//TODO Main Function
const AddComment = ({ postId }) => {
  //TODO Variables
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  //TODO Functions
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("can not add empty comment");
    toast.success("Comment Added Successfully ^-^");
    dispatch(createComment({ text, postId }));
    setText("");
  };
  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={text}
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};

export default AddComment;
