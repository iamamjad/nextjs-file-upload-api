
 ////File Upload on Local Machine /////

// import { NextResponse } from "next/server";
// import { join, dirname } from "path";
// import { writeFile, mkdir } from "fs/promises";

// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     const file = data.get("file");
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const directoryPath = join('.', 'temp'); // Change this path as needed

//     // Ensure the directory exists, create it if necessary
//     await mkdir(directoryPath, { recursive: true });

//     const filePath = join(directoryPath, file.name);
//     await writeFile(filePath, buffer);

//     console.log(`Open ${filePath} to see the uploaded file`);
//     return NextResponse.json({ success: true, status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false });
//   }
// }

/// File Upload On Azure Blob Storage ///////////

import { NextResponse } from "next/server";
import { join, dirname } from "path";
import { writeFile, mkdir } from "fs/promises";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Your Azure Blob Storage credentials
    const connectionString =
      "DefaultEndpointsProtocol=https;AccountName=youraccountname;AccountKey=yourkey==;EndpointSuffix=core.windows.net";
    const containerName = "containername";

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Ensure the container exists, create it if necessary
    await containerClient.createIfNotExists();

    // Upload the file to Azure Blob Storage
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, buffer.length);

    console.log(`File uploaded to Azure Blob Storage: ${blobName}`);

    // Generate a link for the uploaded file
    const blobUrl = `https://${containerClient.accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    // You can now store the 'blobUrl' in your database

    return NextResponse.json({ success: true, status: 200, blobUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

