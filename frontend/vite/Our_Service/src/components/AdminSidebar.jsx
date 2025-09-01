import PropTypes from "prop-types";

const AdminSidebar = ({ onSelect }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-full p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <button onClick={() => onSelect("users")} className="block w-full text-left">Users</button>
      <button onClick={() => onSelect("bookings")} className="block w-full text-left">Bookings</button>
      <button onClick={() => onSelect("invoices")} className="block w-full text-left">Invoices</button>
    </div>
  );
};

AdminSidebar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default AdminSidebar;