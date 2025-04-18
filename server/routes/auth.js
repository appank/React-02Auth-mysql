const express = require("express");
const passport = require("passport");

const router = express.Router();

// 1. Mulai proses login Google (redirect user ke halaman Google)
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Callback dari Google setelah user login
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    session: true,
  }),
  (req, res) => {
    const { displayName, emails, photos } = req.user;
    console.log("req.user di callback:", req.user);


    // 🔒 Gunakan optional chaining
    const email = emails?.[0]?.value || req.user.email || "noemail@example.com";
    const photo = photos?.[0]?.value || req.user.photo || "";

    // 🚀 Redirect ke frontend dengan query params
    res.redirect(
      `${process.env.FRONTEND_URL}/auth-success?email=${encodeURIComponent(email)}&displayName=${encodeURIComponent(displayName)}&photo=${encodeURIComponent(photo)}`
    );
  }
);



// 3. Endpoint untuk cek status user yang sedang login
router.get("/user", (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

// 4. Logout user
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });
});

module.exports = router;
