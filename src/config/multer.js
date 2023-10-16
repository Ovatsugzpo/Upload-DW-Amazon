const multer = require('multer'),
    multerS3 = require('multer-s3'),
    aws = require('@aws-sdk/client-s3'),
    crypto = require('crypto')

module.exports = {
    storage: multerS3({
        s3: new aws.S3(),
        bucket: 'doctorwhoapi',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb)=>{
            crypto.randomBytes(4, (err, hash)=>{
                if (err){cb(err)}
                
            })
        }
    })
}