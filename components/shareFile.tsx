import React from 'react'
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

const files = [
  {
    fileId: "INV001",
    sharedBy: "Paid",
    sharedOn: "$250.00",
    fileName: "Credit Card",
  },
  {
    fileId: "INV002",
    sharedBy: "Pending",
    sharedOn: "$150.00",
    fileName: "PayPal",
  },
  {
    fileId: "INV003",
    sharedBy: "Unpaid",
    sharedOn: "$350.00",
    fileName: "Bank Transfer",
  },
  {
    fileId: "INV004",
    sharedBy: "Paid",
    sharedOn: "$450.00",
    fileName: "Credit Card",
  },
  {
    fileId: "INV005",
    sharedBy: "Paid",
    sharedOn: "$550.00",
    fileName: "PayPal",
  },
  {
    fileId: "INV006",
    sharedBy: "Pending",
    sharedOn: "$200.00",
    fileName: "Bank Transfer",
  },
  {
    fileId: "INV007",
    sharedBy: "Unpaid",
    sharedOn: "$300.00",
    fileName: "Credit Card",
  },
]


const ShareFile = () => {
  return (
    <>
      <Table>
        <TableCaption>A list of your shared files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">fileId</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>SharedOn</TableHead>
            <TableHead className="">Shared By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((fileId) => (
            <TableRow key={fileId.fileId}>
              <TableCell className="font-medium">{fileId.fileId}</TableCell>
              <TableCell>{fileId.fileName}</TableCell>
              <TableCell className="">{fileId.sharedOn}</TableCell>
              <TableCell>{fileId.sharedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

  )
}

export default ShareFile