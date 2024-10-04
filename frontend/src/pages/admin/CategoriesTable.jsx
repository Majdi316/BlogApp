//TODO Pages
import AdminSidebar from "./AdminSidebar";

//TODO Libraries
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

//TODO CSS Files
import "./admin-table.css";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCall";

//TODO Main Function
const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  //TODO Functions
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  //Delete Categories Handler
  const deleteCategoriesHandler = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this Category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#F00A0A",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>

              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.title}</b>
                </td>

                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategoriesHandler(item._id)}>
                      Delete Category
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

export default CategoriesTable;
