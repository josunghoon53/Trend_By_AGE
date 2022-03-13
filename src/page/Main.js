import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../component/Chart';
import MultiChk from '../component/MultiChk';
import { TREND_INIT } from '../reduce/trend';
import { INPUT_INIT } from '../reduce/inputDefault'
import style from '../style/Main.module.scss';

const Main = () =>{


	const dispatch = useDispatch();
	const [category,setcategory] = useState([
		{name : '패션의류' ,id: '50000000'},
		{name :'패션잡화' ,id: '50000001'},
		{name :'화장품미용' ,id:'50000002'},
		{name :'디지털가전',id:'50000003'},
		{name :'가구인테리어' ,id: '50000004'},
		{name :'출산육아',id:'50000005'},
		{name :'식품',id:'50000006'},
		{name :'스포츠레저',id:'50000007'},
		{name :'생활건강',id:'50000008'},
		{name :'여가생활편의',id:'50000009'},
		{name :'면세점',id:'50000010'},
		{name :'도서',id:'50005542'},
	])

	const data = useSelector((state)=>state.inputDefault)
	//dispatch 요청 값 상태관리
	const [startDate,setStartDate] = useState(data.startDate);
	const [endDate,setEndDate] = useState(data.endDate);
	const [gender,setGender] = useState("");
	const [device,setDevice] = useState("");
	const [cate,setCate] = useState(data.category);
	const [keyword,setKeyword] = useState(data.keyword);
	const [timeUnit,setTimeUnit] = useState(null);
	const [ages,setages] = useState([]);

	const submit = () =>{
		dispatch({type : 'trend/TREND_REQUEST', body : {
			startDate : `${startDate}`,
			endDate : `${endDate}`,
			timeUnit : timeUnit,
			category : cate,
			keyword : keyword,
			device : device,
			gender :gender,
			ages : ages,
		}})
	}

	const init = () =>{
		if(window.confirm('그래프값을 초기화시킵니다')) {
			dispatch({type : TREND_INIT})
			dispatch({type : INPUT_INIT, payload : {
				startDate : '',
				endDate : '',
				timeUnit : '',
				category :'50000000',
				keyword : '',
				device : '',
				gender :'',
				ages : '',
			}})
			window.location.reload();
		} 
	} 



	return (
		<div className={style.main_container} onClick = {() =>{
			console.log(data)
		}}>
			<div className={style.input_container}>
				<ul>
					<li className={style.input_box}>
						<div>시작일자</div>
						<input defaultValue={data.startDate}
							style={{
							backgroundColor:startDate!==''?'rgb(157, 176, 216)':'white'}} 
							type={'date'} onChange={(e)=>{setStartDate(e.target.value)}}/>
					</li>
					<li className={style.input_box}>
						<div>종료일자</div>
						<input defaultValue={data.endDate} 
							style={{
							backgroundColor:endDate!==''?'rgb(157, 176, 216)':'white'}} 
							type={'date'} onChange={(e)=>{setEndDate(e.target.value)}}/>
					</li>
					<li className={style.input_box}>
						<div style={{marginRight:'10px'}}>카테고리</div>
						<select defaultValue={data.category} onChange={(e)=>{setCate(e.target.value)}} name="category" className={style.select}>			
							{category.map((el,idx)=>{
								return(<option style={{fontWeight:'bold'}} key={idx} value={el.id}>{el.name}</option>)
							})}
						</select>
					</li>
					<li className={style.input_box}>
						<div>키워드</div>
						<input defaultValue={data.keyword} onChange={(e)=>{setKeyword(e.target.value)}}/>
					</li>
				</ul>
			</div>

			<div className={style.select_container}>
				<select onChange={(e)=>{setTimeUnit(e.target.value)}} name="timeunit" className={style.select}>
					<option value>timeUnit</option>
					<option value="date">date</option>
					<option value="week">week</option>
					<option value="month">month</option>
				</select>
				<select onChange={(e)=>{setGender(e.target.value)}} name="gender" className={style.select}>
					<option value="">gender</option>
					<option value="m">남자</option>
					<option value="f">여자</option>
				</select>
				<select onChange={(e)=>{setDevice(e.target.value)}}  name="device" className={style.select}>
					<option value="">device</option>
					<option value="pc">pc</option>
					<option value="mo">mobile</option>
				</select>
				<MultiChk setages = {setages} ages = {ages}/>

				<button className={style.sub} onClick={()=>{submit()}}>조회</button>
				<button className={style.init} onClick={()=>{init()}}>초기화</button>
			</div>
			<div className={style.graph_container}>
				<Chart startDate={startDate} endDate = {endDate}/>
			</div>
		</div>
	)
}


export default Main