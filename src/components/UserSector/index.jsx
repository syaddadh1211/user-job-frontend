import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import "./style.css";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import { userSectorAll } from "../../apis/gramedia";

export default function UserSector({ formData, setFormData }) {
  const [userSector, setUserSector] = useState([]);
  const [expanded, setExpanded] = useState([]);
  let sectorKey = [];

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? sectorKey : []));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (formData.name === "") {
  //     alert(`You must fill name`);
  //     return;
  //   } else if (formData.terms === "") {
  //     alert("Terms must be checked");
  //     return;
  //   } else if (formData.selected === []) {
  //     alert("Sector must be selected");
  //     return;
  //   }

  //   axios
  //     .post("http://localhost:4000/user", formData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "multipart/form-data"
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/result");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   // alert(`Name: ${formData.name}, terms: ${formData.terms}, Selected: ${formData.selected}`);
  // };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // };

  const handleSelectedItems = (event, nodeId) => {
    setFormData((prevFormData) => ({ ...prevFormData, ["selected"]: nodeId }));
  };

  // const handleSendSelection = (event) => {
  //   const { name, checked } = event.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userSectorAll.get("/");

        setUserSector(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? "Expand all" : "Collapse all"}
        </Button>
        <TreeView
          className="tree-select"
          aria-label="multi-select"
          onNodeSelect={handleSelectedItems}
          expanded={expanded}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          sx={{ height: 216, flexGrow: 1, overflowY: "auto" }}
        >
          {userSector.map((sector, index) => {
            sectorKey.push(
              sector.id,
              sector.type1_id,
              sector.type2_id,
              sector.type3_id
            );
            return (
              <TreeItem
                key={index}
                nodeId={sector.id}
                label={sector.sector_name}
              >
                <TreeItem
                  nodeId={sector.type1_id === null ? "-" : sector.type1_id}
                  label={sector.type1}
                >
                  <TreeItem
                    nodeId={sector.type2_id === null ? "-" : sector.type2_id}
                    label={sector.type2}
                  >
                    <TreeItem
                      nodeId={sector.type3_id === null ? "-" : sector.type3_id}
                      label={sector.type3}
                    />
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            );
          })}
        </TreeView>
      </div>
    </div>
  );
}
