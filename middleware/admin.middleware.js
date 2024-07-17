import jwt from "jsonwebtoken"

const AdminMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;
    const DataCookies = jwt.decode(accessToken, process.env.JWT_ACCES_SECRET);
    if(!(DataCookies.role === "admin")){
        return res.status(401).json({status : "no", message: 'You are not admin'});
    }
    return next();
};

export default AdminMiddleware;