import React, { useEffect, useState } from "react";
import {Button, Checkbox} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./style.css"
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { userSectorAll } from "../../apis/gramedia";

export default function UserSector () {

    const [formData, setFormData] = useState({name: "",terms: "", selected: []});
    const [userSector, setUserSector] = useState([])
    const [expanded, setExpanded] = useState([]);

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
          oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
        );
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        alert(`Name: ${formData.name}, terms: ${formData.terms}, Selected: ${formData.selected}`);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    
    const handleSelectedItems = (event, nodeId) => {              
        setFormData((prevFormData) => ({ ...prevFormData, ['selected']: nodeId }));
        
    }

    const handleSendSelection = (event) => {
       
        const { name, checked} = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));

      }

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
   
           
             <div className="sector-wrapper">
                <div className="sector-text">
                <form onSubmit={handleSubmit}>
                    <label className="text1">Please enter your name and pick the Sectors you are currently involved in.</label>
                    <div>
                        <label className="text2" htmlFor="name">Name:</label>
                        <input className="input1" type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                    </div>
               
                
                    <label className="text3" htmlFor="sector">Sector:</label>
                    <Button onClick={handleExpandClick}>
                        {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                    </Button>
                    <TreeView className="tree-select"
                        aria-label="multi-select"                    
                        onNodeSelect={handleSelectedItems}
                        expanded={expanded}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        multiSelect
                        sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
                        >                        
                        {userSector.map((sector, index) => {     
                            
                            return (
                                <TreeItem key={index} nodeId={sector.id} label={sector.sector_name} >
                                    <TreeItem nodeId={sector.type1_id} label={sector.type1} >
                                        <TreeItem nodeId={sector.type1_id} label={sector.type1} />   
                                    </TreeItem>
                                </TreeItem>
                                
                            )
                        })}
                    </TreeView>  
                                               
              
               
                    {/* <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange}/> */}
                <div>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked name="terms" onClick={(event) => handleSendSelection(event)} />} label="Agree to terms" />
                </FormGroup>
                    <button className="btn-submit" type="submit">Submit</button>
                </div>
                </form>
            </div>
        </div>
      
    )
}
