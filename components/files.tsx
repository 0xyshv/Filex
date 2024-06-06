"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Upload from "./upload";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAccount } from "wagmi";
import { isAddress } from "viem";




const Files = ({ walletAddress }: any) => {
  const { address } = useAccount()
  const [fileData, setFileData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sharing, setSharing] = useState(false);
  const [wallet, setWallet] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState({ file_name: "", file_uuid: "" });


  useEffect(() => {
    setLoading(true);
    readFiles();
  }, []);

  async function handleShare() {
    // validate eth
    if (isAddress(wallet)) {
      setSharing(true);

      const formData = new FormData();
      formData.append("sharedBy", address as string);
      formData.append("sharedWith", wallet);
      formData.append("fileUuid", file.file_uuid);

      try {
        const response = await fetch("/api/apillon/share", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to share file");
        }

        const data = await response.json();
        console.log("File share successful:", data);

        setSharing(false);
        setWallet("");
        setIsSuccess(true);
      } catch (error) {
        console.error("Error sharing file:", error);
        setSharing(false);
      }
    }
  }

  const readFiles = async () => {
    const formData = new FormData();
    const directoryUuid = localStorage.getItem(walletAddress);
    formData.append("directoryUuid", directoryUuid as string);
    formData.append("walletAddress", address as string);

    try {
      const response = await fetch("/api/apillon/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to read file");
      }

      const data = await response.json();
      console.log("File read successfully:", data);

      setFileData(data.data.items);
      setLoading(false);

    } catch (error) {
      console.error("Error reading file:", error);
    }
  };



  return (
    <>
      <div className="flex justify-between px-8">
        <div className="text-2xl font-semibold">My Files</div>
        <Upload />
      </div>
      <div className="p-8 grid grid-cols-3 gap-8 ">
        {loading ? (
          <div className="flex justify-center mt-44">
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center pl-48">
                Loading Files....
              </div>
            </div>
          </div>
        ) : (
          <>
            {fileData.length > 0 ? (
              <>
                {fileData.map((item: any, index: number) => (
                  <Card
                    key={index}
                    className="p-4 shadow-md "
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        File Name : {item.name}
                      </CardTitle>
                      <CardDescription>
                        File uuid : {item.uuid}
                      </CardDescription>

                    </CardHeader>
                    <CardContent className="">

                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge>{new Date(item.createTime).toLocaleDateString()}</Badge>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => {
                              setFile({ file_name: item.name, file_uuid: item.uuid });
                              setIsSuccess(false);
                            }}>
                              Share
                            </Button>
                          </DialogTrigger>
                          {!isSuccess ? (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Share your file
                                </DialogTitle>
                              </DialogHeader>
                              {loading ? (
                                <div className="flex flex-col items-center gap-4 justify-center">

                                  <p>Please wait...</p>
                                </div>
                              ) : (
                                <>
                                  {sharing ? (
                                    <div className="flex flex-col items-center gap-4 justify-center w-full my-6">
                                      {/* <Spinner size="lg" /> */}
                                      <p>Sharing...</p>
                                    </div>
                                  ) : (
                                    <>
                                      <p>
                                        File : {file.file_name + `(${file.file_uuid})`}
                                      </p>
                                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Label>Wallet Address</Label>
                                        <Input
                                          type="text"
                                          value={wallet}
                                          onChange={(e) => setWallet(e.target.value)}
                                          placeholder="Enter receiver's wallet address"
                                          required
                                        />
                                      </div>
                                      <Button
                                        color="secondary"
                                        onClick={handleShare}
                                        disabled={!isAddress(wallet)}
                                      >
                                        Share
                                      </Button>
                                    </>
                                  )}
                                </>
                              )}

                            </DialogContent>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-4 w-full p-4">
                              <div>
                                Success
                              </div>
                              <p>Sharing Successful.</p>
                            </div>
                          )}
                        </Dialog>

                        <Button onClick={() => window.open(item.link, "_blank")}>Download</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : (
              <div className="flex justify-center p-40 font-bold text-xl text-gray-600">
                No Files
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Files;
