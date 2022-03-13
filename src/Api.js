import axios from "axios";

export const api = axios.create({
	baseURL: '/api',
	headers : {
		'Content-Type': 'application/json',
		'X-Naver-Client-Id': process.env.REACT_APP_CLIENT_ID,
		'X-Naver-Client-Secret':  process.env.REACT_APP_CLIENT_SECRET,
	}
});



export const trendData = {

	age : (request_Body) => 
	api.post('/v1/datalab/shopping/category/keyword/age',
	{...request_Body})

}