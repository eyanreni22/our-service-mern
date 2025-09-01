const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    createService,
    getAllServices,
    getServicesByProvider,
    getServiceById,
    deleteService
} = require("../controllers/serviceController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getAllServices);

router.post("/", protect, upload.single("image"), createService); // ✅ Only authenticated providers can add services
// router.get("/", getAllServices); // ✅ Public - Get all services
router.get("/provider", protect, getServicesByProvider); // ✅ Providers can view their services
router.get("/:id", getServiceById); // ✅ Public - Get service by ID
router.delete("/:id", protect, deleteService); // ✅ Only authenticated providers can delete their service

module.exports = router;
// const express = require("express");
// const { protect } = require("../middlewares/authMiddleware");
// const {
//   createService,
//   getAllServices,
//   getServicesByProvider,
//   getServiceById,
//   deleteService
// } = require("../controllers/serviceController");
// const upload = require("../middlewares/uploadMiddleware");

// const router = express.Router();

// // ✅ Public - Get all services
// router.get("/", getAllServices);

// // ✅ Provider only - Add a service (with image upload to Cloudinary)
// router.post("/", protect, upload.single("image"), createService);

// // ✅ Provider only - Get their own services
// router.get("/provider", protect, getServicesByProvider);

// // ✅ Public - Get single service by ID
// router.get("/:id", getServiceById);

// // ✅ Provider only - Delete service
// router.delete("/:id", protect, deleteService);

// module.exports = router;
