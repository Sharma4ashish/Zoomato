export const isAuth = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startswith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid Request  - No auth Header"
            });
        }
    }
    catch (error) {
    }
};
