const verifyNote = (req , res , next) => {
  const {title , body} = req.body;
  if(title == "" || body === "")
    return res.status(400).json({
      msg: "all the field required"
    })
  
  next()
}

const verifyPathId = (req , res , next) => {
  const id = req.params;
  if(!isNaN(id))
    return res.status(404).json({
      msg: "please provide a valide id"
    })
  
  next()
}

module.exports = {
  verifyNote,
  verifyPathId
}