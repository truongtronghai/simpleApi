import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

// Allow React FE (http://localhost:3030) to send cookies
app.use(
  cors({
    origin: "http://localhost:3030",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

// Login simulation: set HttpOnly cookie
app.post("/login", (req, res) => {
  const { username } = req.body;

  // Normally you'd verify user + issue JWT/session token
  const fakeToken = `token-for-${username}`;

  res.cookie("auth_token", fakeToken, {
    httpOnly: true, // 🚨 JS cannot access
    secure: false, // set true in production with HTTPS
    sameSite: "lax", // CSRF protection
    // ❌ no maxAge, no expires → becomes a session cookie
    // maxAge: 1000 * 60 * 15, // 15 mins
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  });

  res.json({ message: "Logged in, cookie set!" });
});

// Protected route: read cookie
app.get("/profile", (req, res) => {
  const token = req.cookies.auth_token;
  console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: "Profile data", token });
});

// Logout: clear cookie
app.post("/logout", (req, res) => {
  console.log("Received token:", req.cookies.auth_token);
  res.clearCookie("auth_token");
  res.json({ message: "Logged out" });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
