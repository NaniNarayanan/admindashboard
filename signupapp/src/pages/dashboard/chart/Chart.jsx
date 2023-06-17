import '../../../../src/pages/dashboard/chart/chart.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart() {

    const data = [
        {
          name: 'Jan',
          "Active User": 4000,
        },
        {
          name: 'Feb',
          "Active User": 3000,
        },
        {
          name: 'Mar',
          "Active User": 2000,
        },
        {
          name: 'Apr',
          "Active User": 2780,
        },
        {
          name: 'May',
          "Active User": 1890,
        },
        {
          name: 'June',
          "Active User": 2390,
        },
        {
          name: 'Jul',
          "Active User": 3490,
        },
        {
          name: 'Aug',
          "Active User": 2490,
        },
        {
          name: 'Sept',
          "Active User": 4490,
        },
        {
          name: 'Oct',
          "Active User": 3780,
        },
        {
          name: 'Nov',
          "Active User": 4490,
        },
        {
          name: 'Dec',
          "Active User": 2090,
        },
      ];
  return (
    <div className='chart'>
        <h3><div className="chartTitle">Sales Analytics</div></h3>
        <ResponsiveContainer width="100%" aspect={4/1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#5550bd'/>
                <Line type="monotone" dataKey="Active User" stroke='#5550bd'/>
                <Tooltip/>
                <CartesianGrid stroke='#eodfdf'/>
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
