export const TREND_REQUEST =  'trend/TREND_REQUEST'; 
export const TREND_SUCCESS =  'trend/TREND_SUCCESS'; 
export const TREND_FAILURE =  'trend/TREND_FAILURE'; 

export const TREND_INIT =  'trend/TREND_INIT'; 


/*------------------------------------------------------*/


const  trendInfo = []


/* ----------------- 리듀서 ---------------------------- */

export default function trend (state = trendInfo,action) {

	switch(action.type) {

		//데이터 호출 성공시 
		case TREND_SUCCESS: {	
			state = action.payload.data[0];
			return state;
		}

		case TREND_INIT: {
			state = []
			return state;
		}
	
		//데이터 호출 실패시
		case TREND_FAILURE: {

			return state;
		}

		//기본값	
		default:
			return state;

	}


}