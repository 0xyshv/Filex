"use client"

import React, { ChangeEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const Upload = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className=''>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="">
            <PlusCircledIcon className="mt-0.5" />
            <span className="w-2"> </span>Upload
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a file to Upload</DialogTitle>
          </DialogHeader>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          {selectedFile && (
            <div>
              <p>Selected File: {selectedFile.name}</p>
            </div>
          )}

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Upload