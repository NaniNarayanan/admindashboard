import React, { useState } from 'react';
import { Box } from '@material-ui/core'
import styled from '@emotion/styled';
import CloseFullscreenIcon from '@material-ui/icons/FullscreenTwoTone';
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';


const Container = styled(Box)`
    flex-grow: 1;
    flex-basic: 0;
    display: flex;
    flex-direction: column;
    padding: 0 8px 8px;
`

const Heading = styled(Box)`
    background: #1d1e22;
    display: flex;
    padding: 9px;
`
const Header = styled(Box)`
    display: flex;
    background: #060606;
    color: #AAAEBC;
    justify-content: space-between;
    font-weight: 700px;
`

const Editor = ({heading, icon, color, value, onChange}) => {

    const [open, setOpen] = useState(true);

    const handleChange = (editor, data, value) =>{
        onChange(value);
    }

  return (
    <>
    <Container 
    style={ open ? null : {flexGrow:0}}>
        <Header>
            <Heading>
                <Box component="span" 
                style={{background: color,
                color:"#000",
                height:"20px", 
                width:"20px", 
                display:"flex", 
                placeContent:"center",
                borderRadius:"5px",
                marginRight:"5px",
                paddingBottom:"2px"}}>{icon}</Box>
                {heading}
            </Heading>
            <CloseFullscreenIcon
                fontSize="small"
                style={{alignSelf:"center"}}
                onClick = {()=>setOpen(prevState => !prevState)}
            />
        </Header>
        <ControlledEditor
         className='controlled -editor'
         value={value}
         onBeforeChange={handleChange}
         options={{
            theme:'material',
            lineNumbers: true  
         }}
         />
    </Container>
    </>
  )
}

export default Editor