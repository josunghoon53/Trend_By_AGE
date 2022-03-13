export const INPUT_REQUEST =  'trend/INPUT_REQUEST'; 
export const INPUT_INIT =  'trend/INPUT_INIT'; 


/*------------------------------------------------------*/


const  inputDefault = [{
	startDate : '',
	endDate : '',
	timeUnit : '',
	category :'50000000',
	keyword : '',
	device : '',
	gender :'',
	ages : '',
}]


/* ----------------- 리듀서 ---------------------------- */

export default function trend (state = inputDefault,action) {

	switch(action.type) {

		//데이터 호출 성공시 
		case INPUT_REQUEST: {	
			state = action.payload;
			return state;
		}

		case INPUT_INIT: {

			state = action.payload
			return state
		
		}


		//기본값	
		default:
			return state;

	}


}