const isAdmin = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success:false,
            message:"access denied ! admin rights only"
        })
    }
    next();
}

export default isAdmin