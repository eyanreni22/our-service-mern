const Service = require("../models/Service");
const path = require("path");

// ✅ Create a new service (only providers can add services)
const createService = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        console.log("Request received:", req.body);  // ✅ Log request body
        console.log("File received:", req.file);  // ✅ Log file upload
        console.log("👤 Authenticated User:", req.user);


        if (req.user.role !== "provider") {
            return res.status(403).json({ message: "Access denied" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const service = await Service.create({
            name,
            description,
            price,
            category,
            provider: req.user.id,
            image:imageUrl
        });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
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
