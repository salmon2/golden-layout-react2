import React, {useRef, useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import { MyGoldenPanel } from "./myGoldenPanel";
import { AppContext } from "./appContext";

import { Menu } from "semantic-ui-react";

import {FusePageSimple, FuseAnimate, FusePageCarded, DemoContent, DemoSidebarContent} from '@fuse';
import { InboxIcon, DraftsIcon, SendIcon, CloseIcon, AccessAlarm, FullscreenExitRounded, HighlightOffRounded, Settings, DeleteIcon, ThreeDRotation } from '@material-ui/icons';

import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

// import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

import {
    Hidden, 
    CardHeader, 
    CardContent,
    Icon, 
    IconButton, 
    Button,
    Paper
  } from '@material-ui/core';
  
  import {
    Card,
    CardBody,
    CardTitle,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from 'reactstrap';

import Modal from '@material-ui/core/Modal';

import TreeView from '../../apps/TreeView/TreeView';


import SettingsPanel from 'app/fuse-layouts/shared-components/TreeViewPanel';


import {makeStyles} from '@material-ui/styles';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import _ from 'lodash';

import axios from "axios";

const useStyles = makeStyles(theme => ({
    layoutRoot: {
     },
      layoutHeader: {
         height                        : 320,
         minHeight                     : 320,
         [theme.breakpoints.down('md')]: {
             height   : 240,
             minHeight: 240
         }
     },
      removeStyle: {
        position: 'absolute',
        right: '7px',
        top: 0,
        cursor: 'pointer',
        fontSize: '20px'
      },
      headerStyle: {
        height: '30px',
        width: '100%',
        background: '#eee',
        borderBottom: '1px solid #bbb',
        margin: '0px 0px 0px 0px',
        padding: '7px 7px 7px 7px',
        position: 'relative'
      },
      title: {
        backgroundColor: "#eee",
        padding: "4px 10px 2px 10px"
      },
      paper: {
        position: 'absolute',
        width: 960,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
  
  }));

function AreaPage()
{

    const classes = useStyles();
    const pageLayout = useRef(null);

    const [ contextValue, setcontextValue] = useState("Default Value");
    const [ myLayout, setMyLayout] = useState(null);
    const [ contentItems, setContentItems] = useState([]);

    const [repositories, setRepositories] = useState([
        {
            id: 1,
            title: "A react component",
            type: "react-component",
            component: "testItem",
            props: { value: "I'm on the left" }
        },
        {
            id: 2,
            title: "Another react component",
            type: "react-component",
            component: "testItem"
        }
   
      ]);



    function handleItemClick()  {
        setMyLayout.root.contentItems[0].addChild({
            title: "Is new Tab",
            type: "react-component",
            component: "testItem"
       });
    };

    // handleItemClick = () => {
    //   this.state.myLayout.root.contentItems[0].addChild({
    //     title: "Is new Tab",
    //     type: "react-component",
    //     component: "testItem"
    //   });
    // };
    // state = { contextValue: "default value", myLayout: null };


   
      return (
                <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center pl-12 lg:pl-24 p-24">
                            <Hidden lgUp>
                                <IconButton
                                    onClick={(ev) => pageLayout.current.toggleLeftSidebar()}
                                    aria-label="open left sidebar"
                                >
                                <Icon>menu</Icon>
                                </IconButton>
                            </Hidden>
                            <div className="flex flex-1 justify-left items-left">

                            <Hidden xsDown>
                                {/* <Button to="#" component={Link} variant="contained">
                                        <Icon className="mr-8">subject</Icon>
                                    TreeView
                                </Button> */}
                                {/* <Button className="normal-case mr-8" variant="contained" onClick={addBlock} >
                                    <Icon className="mr-8">assessment</Icon>
                                    Block Test
                                </Button> */}
                                <Button className="normal-case mr-8" variant="contained"  >
                                    <Icon className="mr-8">assessment</Icon>
                                    Petrophysics
                                </Button>

                                <Button className="normal-case mr-8" variant="contained"  >
                                    <Icon className="mr-8">assessment</Icon>
                                    Seismic Interpretation
                                </Button>
                                <Button className="normal-case mr-8" variant="contained"  >
                                    <Icon className="mr-8">assessment</Icon>  
                                    Pseudo Well
                                </Button>
                                <Button className="normal-case mr-8" variant="contained"  >
                                    <Icon className="mr-8">assessment</Icon>
                                    Quantitative Seismic
                                </Button>
                                <Button className="normal-case mr-8" variant="contained"  >
                                    <Icon className="mr-8">assessment</Icon>
                                    Reservoir Modeling
                                </Button>
                                <Button className="normal-case mr-8" variant="contained"  >
                                    <Icon className="mr-8">assessment</Icon>
                                    Reservoir Engineering
                                </Button>
                            </Hidden>

                            <Hidden smUp>
                                <IconButton color="inherit" >
                                    <Icon>assessment</Icon>
                                </IconButton>

                                <IconButton color="inherit" >
                                    <Icon>assessment</Icon>
                                </IconButton>

                                <IconButton color="inherit" >
                                    <Icon>assessment</Icon>
                                </IconButton>
                            </Hidden>

                            </div>

                            

                        </div>
                    </div>
                }
                contentToolbar={                  
                    <div className=""></div>
                }
                content={
                    <div className="px-24">

                        <div>
                            <div>
                                change context value:
                                <input
                                    value={contextValue}
                                    onChange={e => {
                                        setcontextValue(e.currentTarget.value) }}
                                />
                            </div>
                            <AppContext.Provider value={contextValue}>
                                <Menu pointing vertical>
                                <Menu.Item name="New Modal" onClick={handleItemClick()} />
                            </Menu>

                            <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
                                htmlAttrs={{ style: { height: "500px", width: "100%" } }}
                                config={{
                                content: [
                                    {
                                    type: "stack",
                                    content: [
                                        {
                                            title: "A react component",
                                            type: "react-component",
                                            component: "testItem",
                                            props: { value: "I'm on the left" }
                                        },
                                        {
                                            title: "Another react component",
                                            type: "react-component",
                                            component: "testItem"
                                        }
                                        ]
                                    
                                    }
                                ]
                                }}
                                registerComponents={myLayout => {
                                    // this.setState({ myLayout });
                                    setMyLayout({ myLayout }); 
                                    myLayout.registerComponent("testItem", MyGoldenPanel);
                                }}

                                // registerComponents={myLayout => {
                                //     myLayout.registerComponent("testItem", MyGoldenPanel);
                                // }}

                                
                            />
                            </AppContext.Provider>
                        </div>

                           

                    </div>
                }
                leftSidebarHeader={
                    <div className="p-24"></div>
                }
                leftSidebarContent={
                    <div className="p-24">
                        <TreeView/>
                    </div>
                }
                innerScroll
                ref={pageLayout}
            />



        );
    }
    
export default AreaPage;