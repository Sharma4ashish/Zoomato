import jwt from 'jsonwebtoken';
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Invalid Request  - No auth Header"
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Token Missing"
            });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                message: "Invalid Token"
            });
            return;
        }
        req.user = decodedValue.user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error JWT Error "
        });
    }
};
