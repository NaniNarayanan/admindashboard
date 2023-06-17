import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import * as CgIcons from 'react-icons/cg';
import {SidebarStudentData} from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from "react-icons/lib";
import {useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@material-ui/core";
import AppBreadcrumps from "../../components/AppBreadcrumps";

const Nav = styled.div`
    background: #FFFFFF;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 5px 10px rgba(200,200,200,0.5);
    liststyletype: none;
    margin: 4px;
    padding: 4px;
    overflow: hidden;
    background-color: #fff;
    // text-decoration: underline;
    justify-content: space-between;
    fontsize: 8px;
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: black;
`;
const Links = styled(Link)`
list-style-type: none;
margin: 50px;
padding: 10px;
overflow: hidden;
background-color: #fff;
justify-content: space-between;
`;
const SidebarNav = styled.nav`
  background: #FFFFFF;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  box-shadow: 5px 10px rgba(200,200,200,0.5);
`;
const SidebarWrap = styled.div`
  width: 90%;
`;


const Sidebar = () =>{

    const [name, setName] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:8081/getusername')
        .then(res=>{
            if(res.data.valid){
                setName(res.data.name)
            }else{
                navigate('/')
            }
        })
        .catch(err=>console.log(err))
    },[])

    const Style={ padding:"4px", marginLeft:"2px" }

    const link={
        fontSize:"20px",
        margin: "9px",
        // liststyletype: "none",
        textDecoration: "none"
         }
    
    const [sidebar, setSidebar] = useState(false);

    const [logout, setLogout] = useState(false)

    

    const showSidebar = () => setSidebar(!sidebar);

    // React.useEffect(() =>{
    //     if(!localStorage.getItem('auth')) navigate('/')
    //   },[logout]);

    const logoutHandler = (e) =>{
        axios.get('http://localhost:8081/logout')
        .then(res=>{
            location.reload(true)
        })
        .catch(err=> console.log(err))
        toast.success('logout successfully')
        navigate('/')
    }

    return(
        <>
        <IconContext.Provider value={{color:'gray'}}>
        <Nav>
            <NavIcon to="#">
                <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
            <h5 style={{textAlign:"center",marginLeft:"200px",color:"gray"}}>Hello,{name}</h5>
                <CgIcons.CgProfile style={Style}/>
                <AiIcons.AiFillHome style={Style}/>
                <TiIcons.TiMessages style={Style}/>
            <NavIcon>
            <Links>
                <NavLink style={link} to="/" onClick={logoutHandler}>Logout</NavLink>
            </Links>
                
            </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                <NavIcon to="#">
                    <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </NavIcon>
                {SidebarStudentData.map((item,index) =>{
                    return <SubMenu item={item} key={index}/>
                })}
            </SidebarWrap>
        </SidebarNav>
        </IconContext.Provider>
        <Container style={{marginTop:"20px"}}>
        {/* <AppBreadcrumps/> */}
            {/* <div style={{backgroundColor:"whitesmoke",width:"100%",boxShadow:"0px 0px 11px -2px #000000", padding:"5px", margin:"20px"}}>
            
            </div> */}
        </Container>
        </>
    );
};

export default Sidebar