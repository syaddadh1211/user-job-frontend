import React from 'react'
import { useEffect, useState } from "react";
import { userSectorResult } from "../../apis/gramedia";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button, Checkbox} from "@mui/material";
import "./style.css"

export default function UserResult() {
  const [userSector, setUserSector] = useState([])

  const handleSendSelection = (event) => {
       
    // const { name, checked} = event.target;
    // setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));

  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userSectorResult.get("/result");
        
        setUserSector(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
   
  }, []);

  return (
    <div className='result-wrapper'>Selected user sector are :
      <div className='resultAll'>
      <FormGroup>
        {userSector.map((item, index) => {
          return (
            
            <FormControlLabel key={index +1 }  control={<Checkbox name={item.sectortype_id} onClick={(event) => handleSendSelection(event)} />} label={item.type_name} />
          
        )
        })}
      </FormGroup>  
      </div>
    </div>
  )
}
