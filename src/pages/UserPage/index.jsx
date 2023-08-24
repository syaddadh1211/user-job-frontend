import { Checkbox, Button, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import UserSector from "../../components/UserSector";
import axios from "axios";
import { useNameStore } from "../../app/Store";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./style.css";
import { purple } from "@mui/material/colors";

export default function UserPage() {
  let navigate = useNavigate();
  const setUserName = useNameStore((state) => state.setUserName);

  const [formData, setFormData] = useState({
    name: "",
    terms: "",
    selected: [],
  });

  const handleSendSelection = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.name === "") {
      alert(`You must fill name`);
      return;
    } else if (formData.terms === "") {
      alert("Terms must be checked");
      return;
    } else if (formData.selected.length === 0) {
      alert("Sector must be selected");
      return;
    }

    axios
      .post("https://syaddad.domcloud.io/user", formData, {
        headers: {
          "Content-Type": "application/json",
          // "multipart/form-data"
        },
      })
      .then((res) => {
        console.log(res);
        setUserName(formData.name);
        navigate({
          pathname: "/result/",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="sector-wrapper">
        <div className="sector-3">
          <div className="photo">
            <img
              className="img-sec"
              src="images/group9.svg"
              alt="images/group9.svg"
            />
          </div>
          <div className="sector-text">
            <form onSubmit={handleSubmit}>
              <div className="text1">
                <label>
                  Please enter your name and pick the Sectors you are currently
                  involved in.
                </label>
              </div>
              <div className="text2">
                <label>Name:</label>
                <input
                  className="input1"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="text3">
                <label>Sector:</label>
              </div>

              <UserSector formData={formData} setFormData={setFormData} />
              <div className="text4">
                <label>
                  Hint:{" "}
                  <span className="hint">
                    Click Expand All to show the sector, use Ctrl-Click to
                    choose more than one sector
                  </span>
                </label>
              </div>

              <div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        onClick={(event) => handleSendSelection(event)}
                      />
                    }
                    label="Agree to terms"
                    sx={{
                      color: purple[800],
                      "&.Mui-checked": {
                        color: purple[800],
                      },
                    }}
                  />
                </FormGroup>
                <Button
                  sx={{ borderRadius: 3 }}
                  variant="contained"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
          <div className="photo">
            <img
              className="img-sec"
              src="images/group8.svg"
              alt="images/group8.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
