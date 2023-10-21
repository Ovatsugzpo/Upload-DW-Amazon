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
                    let name = file.originalname.slice(0, 6),
                        ext = file.originalname.split('.').at(-1)

                    cb(null, `${name}#${hash.toString('hex')}.${ext}` )

            })
        }
    }),
    filename: (req, file, cb)=>{
        crypto.randomBytes(4, (err, hash)=>{
            if (err) { cb(err) }
            let name = file.originalname.slice(0, 6),
                ext = file.originalname.split('.').at(-1)

            file.key = `${name}#${hash.toString('hex')}.${ext}`
            cb(null, file.key)
        })
    },
    limits:{
        FileSize: 1*1024*1024*1024*1024
    },
    fileFilter: (req, file, cb)=>{ 
        const allowedMimes = ['video/mp4', 'video/MP4',]
        if (allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Tipo de arquivo invalido'))
        }
    }
}