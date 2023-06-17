import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import styled from '@emotion/styled';
import { DataContext } from '../Context/DataProvider';
import PracticeQuestions from '../../../src/StudentPage/Codepen/PracticeQuestions';

const Container = styled(Box)`
    height: 41vh
`

const Result = () => {

    const [src, setSrc] = useState('');

    const { html, css, js} = useContext(DataContext);


    const timeout = () =>{
        setSrc(`
        <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}<script>
        </html>
    ` );
    };



    // useEffect(()=>{
    //    const timeout = setTimeout(()=>{
    //         setSrc(srcCode);
    //     },1000)

    //     return ()=> clearTimeout(timeout);
    // },[html, css, js])

  return (
    <div style={{display:"flex", justifyContent:"space-between", border:"1px solid #1B66C9", width:"550px",height:"300px", marginTop:"2%", boxShadow:"0px 0px 11px -2px #000000"}}>
        <div style={{flex:"1"}}>
        <button className='btn btn-success' style={{marginTop:"2%", marginLeft:"80%"}} onClick={timeout}>RUN</button>
    <Container>
        <iframe
            srcDoc={src}
            title='Output'
            sandbox='allow-scripts'
            frameBorder={0}
            width="100%"
            height="100%"   
        />
        </Container>
        </div>
        {/* <div style={{flex:"1"}}>
            <PracticeQuestions/>
        </div> */}
    </div>
  )
}

export default Result