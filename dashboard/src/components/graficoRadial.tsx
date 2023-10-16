import { Legend, RadialBar, RadialBarChart, Tooltip } from "recharts"

interface RadialGrafProps {
    data: {dado: number}[]
}

export default function RadialGraf ({data}: RadialGrafProps) {
    data = [{dado: 100}] 
    return (
        <RadialBarChart 
            width={730} 
            height={250} 
            innerRadius="70%" 
            outerRadius="80%" 
            data={data} 
            startAngle={180} 
            endAngle={0}
            >
                <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey={80} />
                <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                <Tooltip />
        </RadialBarChart>
    )
}