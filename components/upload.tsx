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
import { useAccount } from "wagmi";
import DragAndDrop from './dragAndDrop';


const Upload = () => {

  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();

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
          {uploading ? (
            <div className="flex flex-col items-center gap-4 justify-center">
              <p>Uploading file...</p>
            </div>
          ) : (
            <>
              <>
                <p>Please select your file to upload.</p>
                <DragAndDrop
                  walletAddress={address as string}
                  setUploading={setUploading}
                />
              </>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Upload

