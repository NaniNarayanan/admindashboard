import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom"
import Login from './common/home/Login';
import Register from './common/home/Register';
import Courses from '../src/pages/Courses'
import Dashboard from '../src/pages/Dashboard';
import AddCourse from '../src/pages/courses/AddCourse';
import CourseList from '../src/pages/courses/CourseList';
import InstrcutorOverivew from '../src/pages/instructor/InstructorOverview';
import InstructorList from '../src/pages/instructor/InstructorList';
import InstructorDetails from '../src/pages/instructor/InstructorDetails';
import Instructors from '../src/pages/Instructors'
import { Students, EnrollHistory, Enroll } from "../src/pages/Student";
import AdminProfile from "../src/pages/AdminProfile";
import Schedule from "../src/pages/Schedule";
import SignupUser from "../src/pages/SignupUser";
import  Assesment  from "../src/pages/Assesment";
import CourseCategories from './dummydata/CourseCategories';
import { ForInstructors } from './pages/Signup/ForInstructors';
import { ForStudent } from './pages/Signup/ForStudent';
import StudentDashboard from '../src/StudentPage/ViewComponents/StudentDashboard';
import StudentPractice from './StudentPage/ViewComponents/StudentPractice';
import StudentCourse from './StudentPage/ViewComponents/StudentCourse';
import StudentAssignment from './StudentPage/ViewComponents/StudentAssignment';
import StudentProfile from './StudentPage/ViewComponents/StudentProfile';
import StudentTest from './StudentPage/ViewComponents/StudentTest';
import StudentSchedule from './StudentPage/ViewComponents/StudentSchedule';
import TapComponent from './StudentPage/StudentAssets/tapComponent';
import AddModules from './pages/courses/AddModules';
import AddTopic from './pages/courses/AddTopic';
import AddQuestions from './pages/courses/AddQuestions';
import PageNotfound from '../src/common/PageNotFound';
import AddAssesment from './pages/courses/AddAssesment';
import AddSubTopic from './pages/courses/AddSubTopic';
import LessonQuestion from './pages/courses/LessonQuestion';

function App() {
  return (
    <div>
      <Router>
      {/* <Heading/> */}
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/home" element={<Dashboard/>}/>
        <Route path='home/courses' element={<Courses/>} />
        <Route path='home/courses/add' element={<AddCourse/>}/>
        <Route path='/courses/add/update/:id' element={<AddCourse/>}/>
        <Route path='/courses/add/module/' element={<AddModules/>}/>
        <Route path='/courses/add/module/:id/:coursename' element={<AddModules/>}/>
        <Route path='/courses/add/module/:id/:modulename' element={<AddModules/>}/>
        <Route path='/courses/add/module/moduleassesment' element={<AddAssesment/>}/>
        <Route path='/courses/add/module/moduleassesment/:moduleid/:courseid/:coursename/:modulename' element={<AddAssesment/>}/>
        <Route path='/courses/add/topic/' element={<AddTopic/>}/>
        <Route path='/courses/add/topic/:moduleid/:courseid/:coursename/:modulename' element={<AddTopic/>}/>
        <Route path='/courses/add/topic/:moduleid/:courseid/:coursename/:modulename/:subtopicname' element={<AddTopic/>}/>
        <Route path='/courses/add/topic/subtopic/:subtopicid/:moduleid/:courseid/:coursename/:modulename/:subtopicname' element={<AddSubTopic/>}/>
        <Route path='/courses/add/topic/subtopic/:subtopicid/:moduleid/:courseid/:coursename/:modulename/:subtopicname/:topicname' element={<AddSubTopic/>}/>
        <Route path='/courses/add/topic/subtopic/lessonquestion/:lessonid/:subtopicid/:moduleid/:courseid/:coursename/:modulename/:subtopicname/:lessonname' element={<LessonQuestion/>}/>
        <Route path='/courses/add/topic/questions' element={<AddQuestions/>}/>
        <Route path='/courses/add/topic/questions/:subtopicid/:courseid/:coursename/:moduleid/:modulename/:subtopicname' element={<AddQuestions/>}/>
        <Route path='/home/courses/add/categories' element={<CourseCategories/>}/>
        <Route path='/home/courses/add/categories/list' element={<CourseList/>}/>
        <Route path='/home/instructors' element={<Instructors/>} />
        <Route path='/home/instructors/overview' element={<InstrcutorOverivew/>} />
        <Route path='/home/instructors/overview/list' element={<InstructorList/>} />
        <Route path='/home/instructors/overview/list/details' element={<InstructorDetails/>} />
        <Route path='/instructors/details/:userid' element={<InstructorDetails/>} />
        <Route path='/home/adminprofile' element={<AdminProfile/>} />
        <Route path='/home/student' element={<Students/>} />
        <Route path='/home/student/history' element={<EnrollHistory/>} />
        <Route path='/home/student/enroll' element={<Enroll/>} />
        <Route path='/home/schedule' element={<Schedule/>} />
        <Route path='/home/signup' element={<SignupUser/>}/>
        <Route path="/home/signup/instructors" element={<ForInstructors/>}/>
        <Route path="/home/signup/instructors/student" element={<ForStudent/>}/>
        <Route path="/home/assesment" element={<Assesment/>}/>
        <Route path="/tapcomponent/:id" element={<StudentAssignment/>}/>
        <Route path="/studentdashboard" element={<StudentDashboard/>}/>
        <Route path="/studentdashboard/:id" element={<StudentDashboard/>}/>
        <Route path="/studentdashboard/studentmycourses" element={<StudentCourse/>}/>
        <Route path="/studentdashboard/studentmycourses/:id/:coursename" element={<StudentCourse/>}/>
        <Route path="/studentassignment" element={<StudentAssignment/>}/>
        <Route path="/studentdashboard/studentmycourses/studentassignment/:courseid/:coursename/:moduleid/:modulename" element={<StudentAssignment/>}/>
        <Route path="/studenttest" element={<StudentTest/>}/>
        <Route path="/studentdashboard/studentmycourses/studentassignment/studenttest/:moduleid/:courseid/:coursename/:modulename" element={<StudentTest/>}/>
        <Route path="/studentdashboard/studentschedule" element={<StudentSchedule/>}/>
        <Route path="/studentdashboard/studentprofile" element={<StudentProfile/>}/>
        <Route path="/studentpractice" element={<StudentPractice/>}/>
        <Route path="/studentdashboard/studentmycourses/studentassignment/studentpractice/:subtopicid/:courseid/:coursename/:moduleid/:modulename/:subtopicname" element={<StudentPractice/>}/>
        <Route path="/studentpractice/:id/:level" element={<StudentPractice/>}/>
        <Route path="*" element={<PageNotfound/>}/>
      </Routes>

      </Router>

        

    </div>
      
   
  );
}

export default App;
