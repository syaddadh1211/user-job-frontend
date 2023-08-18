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

export default function UserResult() {
  const [userSector, setUserSector] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    terms: "",
    selected: [],
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
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
                        defaultChecked={!edit}
                        disabled={!edit}
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
            <div className="btn-edit">
              <Button
                type="primary"
                variant="contained"
                onClick={handleEditClick}
              >
                {edit === true ? "Save" : "Edit"}
              </Button>
              {"   "}
              <Button type="primary" variant="contained" onClick={handleClick}>
                Done
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
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
      </div>
    </div>
  );
}
