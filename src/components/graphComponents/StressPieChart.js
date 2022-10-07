import { PieChart, Pie, Cell} from 'recharts';

const StressPieChart = (props) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const {data} = props;

    return ( 
      <PieChart width={600} height={400} >
        <Pie
          data={data}
          cx={320}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
          legendType ="line"
        >
          {data.map((x, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
     );
}
 
export default StressPieChart;