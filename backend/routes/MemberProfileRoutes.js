const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getMyProfile,
  updateMyProfile
} = require("../controllers/MemberProfileController");

router.get("/me", auth, getMyProfile);
router.put("/me", auth, updateMyProfile);

module.exports = router;
