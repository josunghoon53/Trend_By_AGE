# Trend_By_AGE
네이버 Open API (쇼핑인사이트)를 활용하여 주어진 검색어에 대한 반환 결과를<br/> 그래프를 활용하여 시각적으로 보여준다.
&nbsp;

&nbsp;
- ### 빌드 

1. `git clone https://github.com/josunghoon53/Trend_By_AGE.git`

2. `cd Trend_By_AGE` 

3. `npm install`

4. `npm run build` && `npm start` 

   

> .env파일을 추가해야 네이버 API 요청이 정상적으로 이루어진다.
>
> 프로젝트 root 폴더에 .env파일 추가 후 아래와 같은 코드 추가
>
> `REACT_APP_CLIENT_ID= {네이버 API 클라이언트 ID}`
>
> `REACT_APP_CLIENT_SECRET = {네이버 API 클라이언트 SECRET}  `

&nbsp;

- ### 프로젝트 설명

  네이버 API를 활용하여 연령별 트랜드 조회의 파라미터 값을 가져오고, 

  받아온 값과 rechart 라이브러리를 통해 아래와 같은 그래프를 출력하도록 하였습니다.

<img src="https://user-images.githubusercontent.com/54616153/158067098-a3693143-9948-4514-a9dd-1a1b9640bd16.png" 
     alt="image-20220313215941588" width = 600 height = 400 />


#### ** 기본적으로 구현한 기능 ** 

- 날짜에 값이 들어가게되면 색상이 바뀌도록 구현하였다 .

- 카테고리는 번호에 일치하는 이름을 넣어 selectBox로 구현하였다.

- 한번 검색한 후 새로고침하면 그래프와 시작일자, 종료일자, 카테고리, 키워드의 입력값은 그대로남아있는다. <초기화 버튼 누를 시 store에 있는 값 초기화>

- 조회버튼을 눌러 성공적으로 api를 받아와서 그래프를 출력하시 특정문구가 출력하도록 하였다.

- 나이는 다중선택이 되도록  selectbox안에 checkbox가 들어가도록 custom아여 구현하였다.

  <아무것도 선택 안할 시 모든 나이대에 관한 값 출력>

  

#### ** 구현할 때 어려웠던 점 ** 

- 파라미터 값을 날짜나 나이 기준으로 그룹화 

  - reduce함수를 활용한 groupby메서드 활용해서 구현

- 각 연령별 날짜배열의 값이 일치하지가 않으면 그래프가 꼬이는 문제가 발생 

  > 10대는 날짜값이 1,2,4  20대의 날짜값이 1,2,3,4 이면 1,2,4의 그래프가 그려지고 다시 
  >
  > 20대만 거꾸로 돌아가는 그래프 선이 출력됨

  - 선택한 나이대의 수와 일치하는 날짜 배열의 수만 출력하도록 구현 (splice,for~in 등 활용)

- recharts 라이브러리의 생소함으로 인한 어려움

  - 이번 기회가 차트 라이브러리에 대해 공부하는 좋은 기회였다고 생각함.

  

  &nbsp;

- ### 필수 / 선택 구현 사항 체크

- [x] 연령별 트렌드 조회의 파라미터 값을 사용자가 입력할 수 있는 페이지를 제작한다.
- [x] Chart Library(recharts 등)를 활용하여 조회 결과에 대한 그래프를 보여준다.
- [x] 연령별 트렌드 조회의 파라미터 ages를 다중 선택할 수 있도록 구현한다.
- [ ] Antd를 활용하여 화면을 꾸민다. (디자인 자유)
- [x] Redux-Saga를 활용하여 비동기 관련 처리를 한다.
- [x] Redux-Persist를 활용하여 새로고침 시, 연령별 트렌드 조회의 파라미터가 유지되도록 한다.
- [ ] Custom Hook에서 비즈니스 로직 처리 및 상태 관리, 비동기 처리를 한다.

&nbsp;

- ### CORS Issue에 대한 해결법

  

#### 원인 

> 동일한 도메인이 아닌 다른 도메인에 리소스를 요청할 시에 보안상의 이유로 
>
> 접근하지 못해서 발생하는 에러이다 



#### 해결법 < proxy 관련 라이브러리를 활용하여 해결>

1. `npm install http-proxy-middleware` 

2.  root폴더에 setupProxy.js 파일 생성 후 아래와 같이 코드 작성 

   ```javascript
   const { createProxyMiddleware } = require("http-proxy-middleware");
   
   module.exports = function(app) {
       app.use(
           createProxyMiddleware('/api', {
               target: 'https://openapi.naver.com',
               changeOrigin: true,
               pathRewrite: {
                   '^/api': '' 
               }
           })
       );
   };
   ```

 3. Api.js 폴더에 코드를 아래와 같이 수정한다

    ```javascript
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
    ```

    



#### 한계점

> 로컬에서의 실행은 정보를 구글링을 통해 수집해, 프록시를 활용해 해결했지만 
>
> 구현결과를 바로 보여줄수 있도록 firebase와 Netlify를 활용해 호스팅하고자 했지만 
>
> cors 인한 API 호출 에러로 , 추 후 이 문제에 대해 해결해보고자 한다. 









