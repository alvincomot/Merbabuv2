import User from '../models/UserModel.js';

export const verifyUser = async (req, res, next) =>{
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized, Please Log In to Your Account"});
    }
    const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });
    if (!user) return res.status(404).json({ message: "User not found" });
    req.userId = user.id;
    req.role = user.role;
    next();
} 

export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });
    if (!user) return res.status(404).json({ message: "User not found" });
    if( user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied, Admins only" });
    }
    next();
} 