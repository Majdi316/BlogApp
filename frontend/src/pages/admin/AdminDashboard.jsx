//TODO Pages
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

//TODO CSS Files
import "./admin.css";

//TODO Main Function
const AdminDashboard = () => {
  //TODO Return
  return (
    <section className="admin-dashboard">
      <AdminSidebar />
      <AdminMain />
    </section>
  );
};

export default AdminDashboard;
