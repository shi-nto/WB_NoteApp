const verifyNote = (req , res , next) => {
  const {title , body} = req.body;
  if(title == "" || body === "")
    return res.status(400).json({
      msg: "all the field required"
    })
  
  next()
}

module.exports = {
  verifyNote,
}