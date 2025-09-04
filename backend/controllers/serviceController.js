const Service = require("../models/Service");
const path = require("path");

// ✅ Create a new service (only providers can add services)
const createService = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    let imageUrl = null;

    if (req.file) {
      const filename = req.file.filename;

      // Build the full URL to access it in Render
      imageUrl = `${process.env.BASE_URL}/uploads/${filename}`;
    }

    const service = await Service.create({
      name,
      description,
      price,
      category,
      provider: req.user.id,
      image: imageUrl, // ✅ full URL stored in MongoDB
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("❌ Error creating service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// ✅ Get services by provider (Only provider can access)
const getServicesByProvider = async (req, res) => {
    try {
        if (req.user.role !== "provider") {
            return res.status(403).json({ message: "Access denied" });
        }

        const services = await Service.find({ provider: req.user.id });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get a single service by ID (Public)
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate("provider", "name email");
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete a service (Only provider who created it can delete)
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // ✅ Fixed condition for better authorization check
        if (service.provider.toString() !== req.user.id && req.user.role !== "provider") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await service.deleteOne();
        res.json({ message: "Service deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const  getAllServices = async (req, res) => {
    try {
        console.log("🔄 Fetching all services...");
        const services = await Service.find().populate("provider", "name email");

        if (!services || services.length === 0) {
            console.warn("⚠️ No services found");
        }

        // ✅ Fix: Handle null image properly
        const updatedServices = services.map(service => ({
            ...service._doc,
            image: service.image 
                ? (service.image.startsWith("http") ? service.image : `${req.protocol}://${req.get("host")}${service.image}`)
                : null, // ✅ Set to null if no image
        }));

        res.json(updatedServices);
    } catch (error) {
        console.error("❌ Error fetching services:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServicesByProvider,
    getServiceById,
    deleteService
};
// const Service = require("../models/Service");
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");

// // ✅ Create a new service (only providers can add services)
// const createService = async (req, res) => {
//   try {
//     const { name, description, price, category } = req.body;
//     console.log("Request received:", req.body);
//     console.log("File received:", req.file);
//     console.log("👤 Authenticated User:", req.user);

//     if (req.user.role !== "provider") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     let imageUrl = null;

//     if (req.file) {
//       // Upload to Cloudinary instead of /uploads
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "services",
//       });
//       imageUrl = result.secure_url;

//       // delete temp file after upload
//       fs.unlinkSync(req.file.path);
//     }

//     const service = await Service.create({
//       name,
//       description,
//       price,
//       category,
//       provider: req.user.id,
//       image: imageUrl,
//     });

//     res.status(201).json(service);
//   } catch (error) {
//     console.error("❌ Error creating service:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ Get services by provider (Only provider can access)
// const getServicesByProvider = async (req, res) => {
//   try {
//     if (req.user.role !== "provider") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const services = await Service.find({ provider: req.user.id });
//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ Get a single service by ID (Public)
// const getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id).populate(
//       "provider",
//       "name email"
//     );
//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ Delete a service (Only provider who created it can delete)
// const deleteService = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     if (
//       service.provider.toString() !== req.user.id &&
//       req.user.role !== "provider"
//     ) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     await service.deleteOne();
//     res.json({ message: "Service deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ Get all services (Public)
// const getAllServices = async (req, res) => {
//   try {
//     console.log("🔄 Fetching all services...");
//     const services = await Service.find().populate("provider", "name email");

//     if (!services || services.length === 0) {
//       console.warn("⚠️ No services found");
//     }

//     // Images are already Cloudinary URLs → no need to rewrite
//     res.json(services);
//   } catch (error) {
//     console.error("❌ Error fetching services:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = {
//   createService,
//   getAllServices,
//   getServicesByProvider,
//   getServiceById,
//   deleteService,
// };
