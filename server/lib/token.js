import crypto from "crypto";
import jwt from "jsonwebtoken";

export const maxAge = 3 * 24 * 60 * 60;

export const secretGenerator = async () => {
    const secret = crypto.randomBytes(32).toString('hex');

    return secret;
};

const secret = await secretGenerator();

export const createToken = async (id, email, admin, name) => {
    return jwt.sign({ id, email, admin, name }, process.env.AUTH_SECRET, {
        expiresIn: maxAge
    });
}