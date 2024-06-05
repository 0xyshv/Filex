import React from 'react'
import View from "@/components/view";
import Download from "@/components/download";
import Share from "@/components/share";

const ShareFile = () => {
  return (
    <div className="flex flex-col gap-12 py-24" >

      <View />
      <Download />
      <Share />
    </div>
  )
}

export default ShareFile