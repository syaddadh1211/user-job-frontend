import React from "react";
import { useEffect, useState } from "react";
import { userSectorResult } from "../../apis/gramedia";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Snackbar, Button } from "@mui/material";
import "./style.css";
import { useNameStore } from "../../app/Store";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import UserSector from "../../components/UserSector";
import axios from "axios";

export default function UserResult() {
  const [userSector, setUserSector] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    terms: "",
    selected: [],
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [itemUnchecked, setItemUnchecked] = useState([]);

  let navigate = useNavigate();

  const userName = useNameStore((state) => state.userName);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick = () => {
    //delete unchecked from table
    axios
      .delete("https://syaddad.domcloud.io/user/result", {
        data: {
          name: userName,
          items: itemUnchecked,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //insert new choice
    setFormData((prevFormData) => ({ ...prevFormData, ["name"]: userName }));
    axios
      .post("https://syaddad.domcloud.io/user", formData, {
        headers: {
          "Content-Type": "application/json",
          // "multipart/form-data"
        },
      })
      .then((res) => {
        setEdit(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckChange = (event) => {
    const name = event.target.name;
    setItemUnchecked((item) =>
      itemUnchecked.includes(name)
        ? itemUnchecked.filter((f) => f !== name)
        : [...itemUnchecked, name]
    );
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    navigate({
      pathname: "/",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userSectorResult.get(
          `/result/?name=${userName}`
        );

        setUserSector(response.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ["name"]: userName,
        }));
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
          <div className="photo">
            <img
              className="img-sec"
              src="../images/group6.svg"
              alt="../images/group6.svg"
              width="376px"
            />
          </div>
          <div className="sector-text">
            <div className="text1">
              <label htmlFor="">User name: {userName}</label>
            </div>
            <div className="text2">
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
                          defaultChecked={!edit}
                          disabled={!edit}
                          onChange={handleCheckChange}
                        />
                      }
                      label={item.type_name}
                    />
                  );
                })}
              </FormGroup>
            </div>
            <div>
              {edit === true ? (
                <UserSector formData={formData} setFormData={setFormData} />
              ) : (
                ""
              )}
              <label className="text4">
                Hint:{" "}
                <span className="hint">
                  Click checkbox to unselected item, use Ctrl-Click to choose
                  more than one sector
                </span>
              </label>
              <div className="btn-edit">
                <Button
                  type="primary"
                  variant="contained"
                  onClick={edit === true ? handleSaveClick : handleEditClick}
                  disabled={userName === "" ? true : false}
                >
                  {edit === true ? "Save" : "Edit"}
                </Button>
                {"   "}
                <Button
                  type="primary"
                  variant="contained"
                  onClick={handleClick}
                  disabled={userName === "" ? true : false}
                >
                  Done
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Thank you for filling the form !
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
          <div className="photo">
            <img
              src="../images/group8.svg"
              alt="../images/group8.svg"
              className="img-sec"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
