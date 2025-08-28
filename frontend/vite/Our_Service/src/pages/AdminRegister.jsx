// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { registerAdmin } from "../redux/Slices/adminSlice";
// // import { useNavigate } from "react-router-dom";


// // function AdminRegister() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });

// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const res = await dispatch(registerAdmin(formData)).unwrap();

// //       console.log("📦 Register Admin Response:", res);

// //       if (res.token) {
// //         localStorage.setItem("token", res.token);
// //       }

// //       setFormData({ name: "", email: "", password: "" });
// //       alert("✅ Admin registered successfully");
// //       navigate("/admin/dashboard");
// //     } catch (err) {
// //       console.error("❌ Registration failed:", err);
// //       setError(err?.message || "Something went wrong. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
// //       >
// //         <h2 className="text-2xl font-bold mb-4 text-center">Admin Register</h2>

// //         {error && (
// //           <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
// //         )}

// //         <input
// //           type="text"
// //           name="name"
// //           value={formData.name}
// //           onChange={handleChange}
// //           placeholder="Name"
// //           className="mb-3 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
// //           required
// //         />
// //         <input
// //           type="email"
// //           name="email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           placeholder="Email"
// //           className="mb-3 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
// //           required
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           placeholder="Password"
// //           className="mb-4 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
// //           required
// //         />

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
// //             loading ? "opacity-50 cursor-not-allowed" : ""
// //           }`}
// //         >
// //           {loading ? "Registering..." : "Register"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AdminRegister;
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerAdmin } from "../redux/Slices/adminSlice";
// import { useNavigate } from "react-router-dom";

// function AdminRegister() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await dispatch(registerAdmin(formData)).unwrap();
//       localStorage.setItem("admin", JSON.stringify(res));
//       alert("Admin registered successfully");
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Admin Register</h2>
//         {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="mb-3 p-2 w-full border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="mb-3 p-2 w-full border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="mb-4 p-2 w-full border rounded"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminRegister;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAdmin } from "../redux/Slices/adminSlice";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await dispatch(registerAdmin(formData)).unwrap();

      console.log("✅ Register Admin Response:", res);

      // ✅ Store only token consistently
      if (res.token) {
        localStorage.setItem("adminToken", res.token);
      }

      alert("✅ Admin registered successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("❌ Registration failed:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Register</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-3 p-2 w-full border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-3 p-2 w-full border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password" // 🔑 fixes Chrome warning
          className="mb-4 p-2 w-full border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;
