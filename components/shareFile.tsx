"use client"

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAccount } from 'wagmi';
import { Button } from './ui/button';

const ShareFile = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    readSharedFiles();
  }, []);

  const readSharedFiles = async () => {
    const formData = new FormData();
    formData.append("walletAddress", address as string);

    try {
      const response = await fetch("/api/apillon/read/shared-files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to read shared file");
      }

      const data = await response.json();

      const tableRows = data.data.items.map((file: any) => ({
        fileId: file.uuid,
        fileName: file.name,
        sharedOn: new Date(file.createTime).toDateString(),
        link: file.link,
      }));

      setFiles(tableRows);
      setLoading(false);
    } catch (error) {
      console.error("Error reading file:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center w-full mt-16">
          Loading Data ...
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">File Id</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>SharedOn</TableHead>
              <TableHead className="">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.fileId}>
                <TableCell className="font-medium">{file.fileId}</TableCell>
                <TableCell>{file.fileName}</TableCell>
                <TableCell className="">{file.sharedOn}</TableCell>
                <TableCell>
                  <Button onClick={() => window.open(file.link, "_blank")}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>

  )
}

export default ShareFile