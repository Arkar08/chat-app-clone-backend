import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
  const token = jwt.sign({ userId }, process.env.secret_key, {
    expiresIn: "30d",
  });
  if (!token) {
    return res.status(400).json("invalid Token");
  }
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.node_env !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;