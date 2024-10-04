//TODO Libraries
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { UploadProfile } from "../../redux/apiCalls/profileApiCall";

//TODO CSS Files

//TODO Global Variables

//TODO Main Function
const UpdateProfileModel = ({ setUpdateProfile, profile }) => {
  //TODO Variables
  const dispatch = useDispatch();
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  //TODO Functions
  //Update Profile Handler
  const updateProfileHandler = (updatedUser) => {
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
        dispatch(UploadProfile(profile?._id,updatedUser))
        Swal.fire({
          title: "Updated!",
          text: "Profile has been updated",
          icon: "success",
        });
        setUpdateProfile(false);
        console.log(updatedUser);
      } else {
        Swal.fire({
          text: "something went wrong",
        });
        setUpdateProfile(false);
      }
    });
  };

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("user name is required");
    const updatedUser = { username, bio };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    updateProfileHandler(updatedUser);
  };

  return (
    <div className="update-model">
      <form onSubmit={formSubmitHandler} className="update-model-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-model-form-close"
          ></i>
        </abbr>
        <h1 className="update-model-title">Update Your profile</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="update-model-input"
          placeholder="User Name"
        />
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          type="text"
          className="update-model-input"
          placeholder="Bio"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="update-model-input"
          placeholder="Password"
        />

        <button className="update-model-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModel;
