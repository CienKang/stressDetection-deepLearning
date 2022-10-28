import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const StressLineChart = (props) => {

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + year ;
        return time;
    }

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
                <XAxis 
                    dataKey="time" 
                    type='number'
                    domain={['auto', 'auto']}
                    tickFormatter={(unixTime) => timeConverter(unixTime)}
                />
                <YAxis />
                <Line type="monotone" dataKey="stress" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
    );
}

export default StressLineChart;