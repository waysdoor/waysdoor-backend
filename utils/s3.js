
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } =require ("@aws-sdk/client-s3")
const { ListObjectsV2Command } =require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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


async function getObjectSignedUrl(key) {
    const params = {
        Bucket: bucketName,
        Key: key
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command); 
    return url;
}


module.exports.getAllFilesInDirectory = async function (directoryPath) {
    const params = {
        Bucket: bucketName,
        Prefix: directoryPath
    };

    try {
        console.log("Listing files with params:", params);
        const response = await s3Client.send(new ListObjectsV2Command(params));
        if (response.Contents) {
            const urls = [];
            for (const item of response.Contents) {
                const url = await getObjectSignedUrl(item.Key);
                urls.push(url);
            }
            return urls;
        } else {
            console.log("No files found in directory:", directoryPath);
            return [];
        }
    } catch (err) {
        console.error("Error listing files in directory:", err);
        return [];
    }
}


