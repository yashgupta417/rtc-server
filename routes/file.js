const express=require('express')
const router=express.Router()
const multer=require('multer')
const multerS3=require("multer-s3");
const aws=require("aws-sdk");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now().toString()+Math.round(Math.random()*1E9).toString())
        },
        acl: "public-read",
    })
})

// //configuring multer
// let storage=multer.diskStorage({
//     destination: function (req, file, cb){
//       cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb){
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)+path.extname(file.originalname)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload=multer({
//   storage: storage,
//   limits:{
//     fileSize: 3*1024*1024 //3 MB
//   }
// })

router.post('/upload/image',upload.single('image'),function(req,res){
  const file=req.file

  //if upload unsuccessfull
  if(!file) return res.status(400).send("File not uploaded")

  res.send({image: file.location})
})



module.exports=router