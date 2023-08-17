import React from "react";
import { useEffect, useState } from "react";
import { userSectorResult } from "../../apis/gramedia";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import "./style.css";
import { useNameStore } from "../../app/Store";
import { Button } from "@mui/material";

export default function UserResult() {
  const [userSector, setUserSector] = useState([]);

  const userName = useNameStore((state) => state.userName);

  const handleSendSelection = (event) => {
    // const { name, checked} = event.target;
    // setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userSectorResult.get(
          `/result/?name=${userName}`
        );

        setUserSector(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userName]);

  return (
    <div>
      <div className="result-wrapper">
        <div className="resultAll">
          <div>
            <label htmlFor="">User name: {userName}</label>
          </div>
          <div>
            <label htmlFor="">Sector selected: </label>
          </div>
          <div>
            <FormGroup>
              {userSector.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index + 1}
                    control={
                      <Checkbox
                        name={item.sectortype_id}
                        defaultChecked
                        disabled
                      />
                    }
                    label={item.type_name}
                  />
                );
              })}
            </FormGroup>
          </div>
          <div>
            <Button type="primary" variant="contained">
              Edit
            </Button>
            {"   "}
            <Button type="primary" variant="contained">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
