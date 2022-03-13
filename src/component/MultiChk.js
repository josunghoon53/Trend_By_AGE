import { useEffect, useRef, useState } from 'react'
import style from '../style/MultiChk.module.scss'

const MultiChk = (props) =>{

	const [section,setSection] = 
	useState(['10-19세','20-29세','30-39세','40-49세','50-59세','60-69세',])
	const [modal,setModal] = useState(false);
	const mul = useRef();
	const ul = useRef();

	const onoff = (e) =>{
		
		if(mul.current === e) {
			setModal(true); 
		}
	}

	const ageFuc = (e,idx) =>{
		if(e.target.checked == true) {
			props.setages([...props.ages,e.target.value])
		} else {
			props.setages(
				props.ages.filter((el)=>{
					return el !== e.target.value;
				})
			)
		}
	}

	useEffect(() => {
		window.addEventListener("click", clickFuc);
		return () => {
			window.removeEventListener("click", clickFuc);
		};
	});

	const clickFuc = ({target}) =>{
		if(modal && (!ul.current || !ul.current.contains(target))) setModal(false)
	}



	return(

		<div  className={style.Multi_container}>
			<div ref={mul} onClick={(e)=>{onoff(e.currentTarget)}} className={style.Multi_box}>
				<div className={style.text}>age</div>
				<span className={style.arrow}/>
			</div>
				<ul ref={ul} style={{display:modal?'flex':'none'}}  className={style.block}>
					{section.map((el,idx)=>{
						return(
							<li key={idx}>
								<input 
								value={(idx+1)*10} onChange={(e)=>{ageFuc(e,idx)}} 
								type='checkbox'/>
								<div>{el}</div>
							</li>
						)
					})}
				</ul>		
		</div>
	)
}


export default MultiChk