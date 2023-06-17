import React from "react";
import '../../src/pages/dashboard.css'
import Sidebar from "../components/Sidebar";
import FeaturedInfo from "../../src/pages/dashboard/FeaturedInfo";
import Chart from "../../src/pages/dashboard/chart/Chart";
import WidgetSm from "../../src/pages/dashboard/widgetsm/WidgetSm";
import WidgetLg from "../../src/pages/dashboard/widgetlg/WidgetLg";
import { Link } from "react-router-dom";

const Dashboard = () => {
return (
	<div className="dashboard">
		<Sidebar/>
		<div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home</Link>
        </div>
		<FeaturedInfo/>
		<Chart/>
		<div className="homeWidget">
			<WidgetSm/>
			<WidgetLg/>
		</div>
	</div>
);
};

export default Dashboard;