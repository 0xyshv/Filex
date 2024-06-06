//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";

export const runtime = "nodejs";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: Response) {
  const data = await req.formData();
  const file = data.get("file");
  const wallet = data.get("walletAddress");
  console.log("wallet", wallet);

  // file is the file object
  const content = await file?.arrayBuffer();
  const fileName = file?.name;
  const contentType = file?.type;

  // Initialize the SDK
  const storage = new Storage({
    key: process.env.APILLION_API_KEY,
    secret: process.env.APILLION_SECRET,
    logLevel: LogLevel.VERBOSE,
  });

  // list buckets
  const buckets = await storage.listBuckets({ limit: 5 });

  // create and instance of a bucket directly through uuid
  const bucket = storage.bucket("734f3b74-91ff-40b3-801c-d0bfabb43628");

  await bucket.uploadFiles(
    [
      {
        fileName: fileName,
        contentType: contentType,
        content: content,
      },
    ],
    // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
    { wrapWithDirectory: true, directoryPath: `user_data/${wallet}` }
  );

  return NextResponse.json({
    message: "File uploaded successfully",
    status: "ok",
    data: uploadResult,
    file: uploadedFile,
  });
}
