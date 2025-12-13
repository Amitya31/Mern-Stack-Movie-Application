export const adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only",
        });
    }
    next();
};
//# sourceMappingURL=admin.middleware.js.map