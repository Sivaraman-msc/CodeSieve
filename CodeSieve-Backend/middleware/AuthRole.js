exports.AuthRole = (...allowedRole) => {
    return (req, res, next) => {
        const userRole = req.user.role

        if (!allowedRole.includes(userRole)) {
            return res.status(403).send('Access Denied')
        }
        next()
    }
}