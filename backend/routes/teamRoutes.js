const router = require("express").Router();
const Team = require("../models/Team");
const upload = require("../middleware/uploads");
const auth = require("../middleware/auth");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const members = await Team.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    // Check if file exists to prevent "cannot read property filename of undefined"
    const imagePath = req.file ? req.file.filename : "default.jpg";

    const newMember = new Team({
      name: req.body.name,
      email: req.body.email,
      designation: req.body.designation,
      specialization: req.body.specialization,
      experience: req.body.experience,
      features: req.body.features ? JSON.parse(req.body.features) : [],
      image: imagePath
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: "Error creating member", error: err.message });
  }
});




// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedMember = await Team.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;