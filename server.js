import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
import multer from "multer";

const app = express();
const upload = multer();

app.post("/remove", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("image_file", req.file.buffer);

    const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": "YOUR_CLIPDROP_API_KEY"
      },
      body: formData
    });

    const buffer = await response.buffer();
    res.set("Content-Type", "image/png");
    res.send(buffer);

  } catch (err) {
    res.status(500).send("Error processing image");
  }
});

app.listen(3000, () => console.log("Server running"));