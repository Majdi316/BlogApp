//TODO Libraries
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//TODO CSS Files
import "./category.css";

//TODO Pages
import PostList from "../../components/posts/PostList";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

//TODO Main Function
const Category = () => {
  //TODO Variables
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  //TODO Functions
  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [dispatch, category]);
  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to Posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
