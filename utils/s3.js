
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } =require ("@aws-sdk/client-s3")
const { ListObjectsV2Command } =require("@aws-sdk/client-s3");
require("dotenv").config({ path: "../config.env" });


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})
module.exports.uploadFile=async function (fileBuffer, key, mimetype) {
    
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: key,
        ContentType: mimetype
    }

    return s3Client.send(new PutObjectCommand(uploadParams));
}





module.exports.getAllFilesInDirectory= async function ( directoryPath) {

    const params = {
        Bucket: bucketName,
        region:region,
        Prefix: directoryPath
    };

    try {
        const response = await s3Client.send(new ListObjectsV2Command(params));
        console.log(response,"response");
        return response.Contents.map(item => item.Key);
    } catch (err) {
        console.error("Error listing files in directory:", err);
        return [];
    }
}


