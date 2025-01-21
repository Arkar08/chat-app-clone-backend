import Users from "../models/UserSchema.js";
import jwt from 'jsonwebtoken'

const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if (token) {
            try {
              const sliceToken = token.slice(7);
              const decoded = jwt.verify(sliceToken, process.env.secret_key);
              req.user = await Users.findById(decoded.userId).select("-password");
              next();
            } catch (error) {
              return res.status(400).json("no authorized token failed");
            }
          } else {
            return res.status(400).json("no token");
          }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default protectedRoute;