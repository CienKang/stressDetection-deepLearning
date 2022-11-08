import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const StressLineChart = (props) => {

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var time = month + ' ' + year ;
        return time;
    }

    const {data} = props;
      

    return (
            <LineChart
                width={700}
                height={500}
                data={data}
                margin={{
                    top: 20,
                    right: 80,
                    left: 20,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }}
                    dataKey="time" 
                    type='number'
                    domain={['auto', 'auto']}
                    tickFormatter={(unixTime) => timeConverter(unixTime)}
                />
                <YAxis label={{ value: 'Stress Probability', angle: -90, position: 'insideLeft', offset:-10}} />
                <Tooltip formatter={function(value, name) {
                    if (name==="stress") {
                        return [value, "Stress Probability"]
                    }
                }}
                    labelFormatter={function(unixTime) {
                        return `Time: ${timeConverter(unixTime)}`
                    }}
                />
                <Line type="monotone" dataKey="stress" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
    );
}

export default StressLineChart;