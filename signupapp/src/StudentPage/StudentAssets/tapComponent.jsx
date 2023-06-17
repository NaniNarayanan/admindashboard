import React, { useEffect, useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBCol
  } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import StudentPractice from '../ViewComponents/StudentPractice';
import DataProvider from '../Context/DataProvider';
import Home from '../Codepen/Home';

const TapComponent = () => {



  const navigate = useNavigate()
  const location = useLocation()
  const subtopicname =   location.pathname.split('/')[2]

  const topic = subtopicname.replaceAll('%20', ' ')
    const [basicActive, setBasicActive] = useState('tab1');

    const [verticalActive, setVerticalActive] = useState('tab1');

    const handleVerticalClick = (value) => {
      if (value === verticalActive) {
        return;
      }
  
      setVerticalActive(value);
    };


    const [data, setData] = useState([]);

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:8081/api/gettap/${subtopicname}`);
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    },[])

    // const renderTap = (info) =>{
    //     return(
            
    //     )
    // }

  return (
    // <div>
    //     {data.map(renderTap)}
    // </div>
    <>
            <MDBTabs pills className='mb-3'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Learning Material
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Practice
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                Assesment Test
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          <MDBCol style={{ position: "relative",width:"1400px" }}>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}>{data.subtopicdocument}</MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>
            <img href={data.subtopicvideo} alt="" />
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>
              <DataProvider>
                <Home/>
              </DataProvider>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
          </>
  )
}

export default TapComponent