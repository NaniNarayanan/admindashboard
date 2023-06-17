import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Sidebar from '../../components/Sidebar';
import "../../../src/pages/assesment/assesmentsubtopics.css";
import SubTopicsList from './SubTopicsList';


function AssesmentSubTopics() {
  return (
    <>
    <Sidebar/>
    <div className="subtopicTab">
    <Tabs
      defaultActiveKey="home"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Sub Topics">
         <SubTopicsList/>
      </Tab>
      {/* <Tab eventKey="profile" title="Practice Questions">
        
      </Tab>
      <Tab eventKey="longer-tab" title="Assesment">
        
      </Tab>
      <Tab eventKey="contact" title="Practice and Assesments">
        
      </Tab> */}
    </Tabs>
    </div>
    </>
  );
}

export default AssesmentSubTopics;