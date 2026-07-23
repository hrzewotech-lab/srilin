const express = require("../config/express-shim");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  changeUserRole,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

// Apply protect to all routes
router.use(protect);

// Only superadmins can create users, but both admins and superadmins can view the list
router.route("/").post(authorize("superadmin"), createUser).get(authorize("admin", "superadmin"), getUsers);

// The rest are strictly superadmin
const requireSuperadmin = authorize("superadmin");

router.route("/:id")
  .get(requireSuperadmin, getUserById)
  .put(requireSuperadmin, updateUser)
  .delete(requireSuperadmin, deleteUser);

router.patch("/:id/role", requireSuperadmin, changeUserRole);

module.exports = router;
