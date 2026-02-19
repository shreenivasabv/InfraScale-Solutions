const MemberProfile = require("../models/MemberProfile");

// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await MemberProfile.findOne({ authId: req.user.id });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    res.json(profile);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

// UPDATE PROFILE
exports.updateMyProfile = async (req, res) => {
  try {
    const updated = await MemberProfile.findOneAndUpdate(
      { authId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};
