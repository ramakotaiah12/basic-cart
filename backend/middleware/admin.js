const admin = async (req, res, next) => {
    try {
        if(!req.user.isAdmin){
          return  res.status(401).json({ Error: 'No access' })
        }
        next()
    } catch (e) {
        res.status(401).json({ Error: 'No access' })
    }
}

module.exports = admin;