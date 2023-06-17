import "../../../../src/pages/dashboard/widgetlg/widgetlg.css"

export default function WidgetLg() {

  const Button = ({type}) =>{
    return <button className={"WidgetLgButton " + type}>{type}</button>
  }

  return (
    <div className="widgetlg">
        <h3 className="widgetLgTitle">Student Enrolls</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Student</th>
            <th className="widgetLgTh">Department</th>
            <th className="widgetLgTh">Enroll Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={require("../../../../src/Assets/images/girlprof.jpg")} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Jhonsi Suzi</span>
            </td>
            <td className="widgetLgDep">Data Science</td>
            <td className="widgetLgDate">2 Mar 2023</td>
            <td className="widgetLgAmount">$45,000</td>
            <td className="widgetLgStatus"><Button type="Active"/></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={require("../../../../src/Assets/images/boyprof1.jpg")} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Krithik</span>
            </td>
            <td className="widgetLgDep">Java FullStack</td>
            <td className="widgetLgDate">2 Mar 2023</td>
            <td className="widgetLgAmount">$45,000</td>
            <td className="widgetLgStatus"><Button type="Pending"/></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={require("../../../../src/Assets/images/girlprof2.jpg")} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Zoya Sumai</span>
            </td>
            <td className="widgetLgDep">React FullStack</td>
            <td className="widgetLgDate">2 Mar 2023</td>
            <td className="widgetLgAmount">$45,000</td>
            <td className="widgetLgStatus"><Button type="Inactive"/></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={require("../../../../src/Assets/images/boyprof2.jpg")} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Surya Kumar</span>
            </td>
            <td className="widgetLgDep">Java FullStack</td>
            <td className="widgetLgDate">2 Mar 2023</td>
            <td className="widgetLgAmount">$45,000</td>
            <td className="widgetLgStatus"><Button type="Active"/></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={require("../../../../src/Assets/images/girlprof3.jpg")} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Maria Fernda</span>
            </td>
            <td className="widgetLgDep">Python FullStack</td>
            <td className="widgetLgDate">2 Mar 2023</td>
            <td className="widgetLgAmount">$45,000</td>
            <td className="widgetLgStatus"><Button type="Inactive"/></td>
          </tr>
        </table>
    </div>
  )
}
