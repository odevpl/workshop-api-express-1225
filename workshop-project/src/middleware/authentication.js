export default function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || token !== "SECRET123") {
    return res.status(403).json({ error: "Invalid or missing token" });
  }

  req.user = { role: "admin" };

  next();
}
