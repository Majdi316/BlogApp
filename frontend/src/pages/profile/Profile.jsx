//TODO Libraries
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
//TODO Pages
import UpdateProfileModel from "./UpdateProfileModel";
//TODO Redux Functions
import {
  deleteProfile,
  getUserProfile,
  UploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

//TODO CSS Files
import "./profile.css";
import PostItem from "../../components/posts/PostItem";

//TODO Main Function
const Profile = () => {
  //TODO Variables
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);
  const { id } = useParams();

  //TODO Functions
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [isProfileDeleted, navigate]);

  //Delete Account Handler
  const deleteAccountHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#F00A0A",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };
  //Update Profile Photo Handler
  const updateProfilePhoto = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update your profile photo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15BE1B",
      cancelButtonColor: "#F00A0A",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("image", file);
        dispatch(UploadProfilePhoto(formData));
      } else {
        Swal.fire({
          text: "the process has been canceled",
        });
      }
    });
  };
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("image not found!!!");
    updateProfilePhoto();
  };

  if (loading) {
    return (
      <div className="profile-loader">
        <Oval
          visible={true}
          height="120"
          width="120"
          color="#000"
          secondaryColor="grey"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date joined:</strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>
      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      )}

      {updateProfile && (
        <UpdateProfileModel
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
