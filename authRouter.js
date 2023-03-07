const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");
const roleMiddleware = require("./middlewaree/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 15 символов"
    ).isLength({ min: 4, max: 15 }),
  ],
  controller.registration
);
router.post("/avtorization", controller.login);
router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        login: user.login,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});
module.exports = router;
