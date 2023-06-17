import { Link } from "react-router-dom";
import "../../../../src/pages/dashboard/widgetsm/widgetsm.css"
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function WidgetSm() {
  return (
    <div className="widgetsm">
        <span className="widgetSmTitle">Our Instructors</span>
        <ul className="widgetSmList">
            <li className="widgetSmListItem">
                <img src={require("../../../../src/Assets/images/womenprof2.webp")} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername" style={{marginLeft:"-30px"}}>Maliga Dev</span>
                    <span className="widgetSmUserTitle" style={{marginLeft:"-30px"}}>React Developer</span>
                </div>
                <Link to="/instructors/details/">
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon"/>
                        Display
                    </button>
                </Link>
            </li>
            <li className="widgetSmListItem">
                <img src={require("../../../../src/Assets/images/menprof.jpg")} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername" >Kiran Choudery</span>
                    <span className="widgetSmUserTitle" >JavaScript Developer</span>
                </div>
                <Link to="/instructors/details/">
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon"/>
                        Display
                    </button>
                </Link>
            </li>
            <li className="widgetSmListItem">
                <img src={require("../../../../src/Assets/images/womenprof3.jpg")} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername" style={{marginLeft:"-30px"}}>Jenifer</span>
                    <span className="widgetSmUserTitle" style={{marginLeft:"-30px"}}>Python Developer</span>
                </div>
                <Link to="/instructors/details/">
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon"/>
                        Display
                    </button>
                </Link>
            </li>
            <li className="widgetSmListItem">
                <img src={require("../../../../src/Assets/images/profile.jpg")} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Ram Kishore</span>
                    <span className="widgetSmUserTitle">WebDesign Developer</span>
                </div>
                <Link to="/instructors/details/">
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon"/>
                        Display
                    </button>
                </Link>
            </li>
            <li className="widgetSmListItem">
                <img src={require("../../../../src/Assets/images/womenprof2.webp")} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername" style={{marginLeft:"-42px"}}>Lalitha Patel</span>
                    <span className="widgetSmUserTitle" style={{marginLeft:"-42px"}}>Java Developer</span>
                </div>
                <Link to="/instructors/details/">
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon"/>
                            Display
                    </button>
                </Link>
            </li>
        </ul>
    </div>
  )
}
