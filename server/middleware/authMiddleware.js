import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** Authenticate User Token */
const requireAuthToken = async (req, res, next) => {
    const { authToken } = req.cookies;

    /** check if token exists and is verified */
    if (authToken) {
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({message: "Invalid User Token"})
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        return res.status(500).json({message: 'You are not authorized for this action!'})
    }
}

/** check user */
const checkUser = async (req, res, next) => {
    const { authToken } = req.cookies;

    /** check token and verify user */
    if (authToken) {
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                console.log({decodedToken})
            }
        })
    } else {
        return res.status(500).json({message: 'You are not authorize to use this resource!'})
    }
}

/** check admin privilleges */
const checkAdmin = (req, res, next) => {
    const { authToken } = req.cookies;

    if (authToken) {
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                return res.status(401).json({message: 'You do not have authorization for this action!'})
            } else {
                console.log({ decodedToken });
                if (decodedToken.admin) {
                    next()
                } else {
                    return res.status(400).json({message: 'This resource requires admin access!'})
                }
            }
        })
    } else {
        return res.status(500).json({message: 'You have no authorization!'})
    }
}


export {
    requireAuthToken,
    checkUser,
    checkAdmin
}