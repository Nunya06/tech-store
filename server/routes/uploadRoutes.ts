import express from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import { supabase } from "../config/supabase.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const fileName = `${Date.now()}-${req.file.originalname}`;
        const filePath = `products/${fileName}`;

        const { data, error } = await supabase.storage
            .from("product-images")
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true,
            });

        if (error) {
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("product-images")
            .getPublicUrl(filePath);

        res.json({ url: publicUrl });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default uploadRouter;
