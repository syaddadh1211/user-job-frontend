import {Button} from "@mui/material"; 
import React, { useEffect, useState } from "react";
import UserSector from "../../components/UserSector"

export default function UserPage() {
    return (
        <div> 
          <UserSector />         
          {/* <Button type="primary">Tambah Nilai</Button> */}
        </div>
      );
}