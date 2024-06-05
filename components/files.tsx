"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Upload from "./upload";

const Files = () => {

  const [fileData, setfileData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    console.log("Getting files...");
    setLoading(false); //true
  }, []);


  return (
    <div className="p-8 grid gap-8 ">
      <div className="flex justify-between">
        <div></div>
        <Upload />
      </div>
      {loading ? (
        <div className="flex justify-center mt-44">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center p-4">
              Loading Files....
            </div>
          </div>
        </div>
      ) : (
        <>
          {fileData.length > 0 ? (
            <>
              {fileData.map((item, index) => (
                <Card
                  key={index}
                  className="p-4 shadow-md "
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      File Name
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    File Name
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button>View</Button>
                    <Button>Share</Button>
                    <Button>Download</Button>
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
  );
};

export default Files;
