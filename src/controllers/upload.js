import AWS from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSKEY,
  secretAccessKey: process.env.AWSECRET,
});

export const uploadToS3 = async (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: "motoapiprueba2",
    Key: fileName,
    Body: fileContent,
    ACL: "public-read",
  };

  try {
    const data = await s3.upload(params).promise();
    fs.unlinkSync(filePath);
    console.log("Archivo local eliminado");
    console.log("Archivo subido exitosamente:", data.Location);
    return {
      success: true,
      message: "Archivo subido exitosamente",
      location: data.Location,
    };
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return {
      success: false,
      message: "Error al subir el archivo",
      error,
    };
  }
};
