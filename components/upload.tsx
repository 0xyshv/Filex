"use client"

import React, { ChangeEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const Upload = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
          <div className='pl-20'>
            {imagePreview && (
              <img src={imagePreview} alt="Selected File" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            )}
          </div>
          <DialogFooter>
            <Button>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Upload