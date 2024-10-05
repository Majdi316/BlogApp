import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./create-post.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault(); //to do not reload the same page
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    // if (!file) return toast.error("Post Image is required");
    const formDate = new FormData();
    formDate.append("image", file); //the string must be same name of DB failed
    formDate.append("title", title);
    formDate.append("category", category);
    formDate.append("description", description);
    //TODO Send Form Data to Server
    dispatch(createPost(formDate));
  };

  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input"
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
          rows="5"
          className="create-post-textarea"
          placeholder="Post Description"
        ></textarea>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              visible={true}
              height="40"
              width="40"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
