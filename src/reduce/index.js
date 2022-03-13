import {combineReducers} from 'redux';
import trend from './trend';
import inputDefault from './inputDefault';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persisConfig = {
	key: "root",
  storage,
  whitelist: ["trend","inputDefault"]
}

const rootReducer = combineReducers({
	trend,
	inputDefault
})



export default persistReducer(persisConfig, rootReducer)