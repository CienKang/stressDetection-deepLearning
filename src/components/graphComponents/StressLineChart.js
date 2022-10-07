import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const StressLineChart = (props) => {

    const {data} = props;
      

    return (
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="postNo" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stress" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
    );
}

export default StressLineChart;