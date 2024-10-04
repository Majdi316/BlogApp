//TODO Libraries
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
//TODO CSS Files

//TODO Main Function
const UpdatePostModel = ({ setUpdatePost, post }) => {
  //TODO Variables
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  //TODO Functions
  //Update Post Handler
  const updatePostHandler = () => {
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
        dispatch(updatePost({ title, category, description }, post?._id));
        Swal.fire({
          title: "Updated!",
          text: "Post has been updated",
          icon: "success",
        });
        setUpdatePost(false);
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
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");

    updatePostHandler();
  };

  return (
    <div className="update-model">
      <form onSubmit={formSubmitHandler} className="update-model-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill update-model-form-close"
          ></i>
        </abbr>
        <h1 className="update-model-title">Update Post</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="update-model-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="update-model-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="update-model-textarea"
          rows="5"
        ></textarea>
        <button className="update-model-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModel;
