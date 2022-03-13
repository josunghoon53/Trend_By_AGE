import moment from 'moment';
import { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import {
	ComposedChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
} from 'recharts'

import { groupBy } from './groupBy';


const Chart = (props) =>{

	const [graph_color,setGraph_color] = 
	useState(['#DE3C3C','#FDA92C','#E6E61A','#1AE679','#1A35E6','#C41AE6'])
	const [ageUnit,setAgeUnit] = useState();
	const [graphData,setgraphData] = useState({})
	let trendData = useSelector((state)=>state.trend)



	useEffect(()=>{
			let copy = [];
			trendData && trendData.data?.map((el)=>{copy.push(el)})
			let age = groupBy(copy,'group')
			setAgeUnit(groupBy(copy,'group'))
			setgraphData([]);
			Object.keys(age).map((e)=>{
				let period = groupBy(copy,'period')
				for(let x in period) {
					if(period[x].length !== Object.keys(age).length){
						age[e].map((el,idx)=>{
							if(el.period === x){
								age[e].splice(idx,1)
							}
						})
					}
				}
				setgraphData(graphData => [...graphData,{data :age[e]}])
			})
	},[trendData])


	return (	
		<ResponsiveContainer>
			<LineChart
			width={810}
			height={400}
			data = {graphData}
			margin={{top: 20, right: 80, bottom: 20, left: 20,}}>
				<CartesianGrid stroke="#f5f5f5" />
			 	<XAxis type='category'  allowDuplicatedCategory={false}  
				 dataKey="period"/>
				<YAxis tickCount={11} type='number' domain={[0,100]} />
				<Tooltip />
        <Legend wrapperStyle={{top:'-10px'}}  layout='vertical' verticalAlign='top' 
					payload={
					ageUnit&&	Object.keys(ageUnit)?.map(
							(item, index) => ({
								type: "square",
								value: `${item}대`,
								color: graph_color[index]
							})
						)
					}
				/>
				<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
					{[...Array(graphData?.length)].map((el,idx)=>{
							return(
								<Line key={idx} type='monotone' 
								data={graphData[idx]?.data} dataKey='ratio' 
								stroke={graph_color[idx]} />
							)
					})}
				
			</LineChart>
		</ResponsiveContainer>
	)
}


export default Chart