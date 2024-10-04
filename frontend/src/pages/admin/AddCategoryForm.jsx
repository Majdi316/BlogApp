//TODO Libraries
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

//TODO Main Function
const AddCategoryForm = () => {
  //TODO Variables
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  //TODO Functions
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required");
    dispatch(createCategory({ title }));
    setTitle("");
  };
  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Category Title"
          />
        </div>
        <button className="add-category-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
