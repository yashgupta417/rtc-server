const express=require('express')
const router=express.Router()
const multer=require('multer')
const path=require('path')


//configuring multer
let storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
      },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)+path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload=multer({
  storage: storage,
  limits:{
    fileSize: 3*1024*1024 //3 MB
  }
})

router.post('/upload/image',upload.single('image'),function(req,res){
  const file=req.file

  //if upload unsuccessfull
  if(!file) return res.status(400).send("File upload unsucessfull")

  const image=req.protocol+'://'+req.get('host')+'/'+file.path
  res.send({
    image: image
  })
})



module.exports=router