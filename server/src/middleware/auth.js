import jwt from "jsonwebtoken"

export function authRequired(req, res, next) {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name }
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
