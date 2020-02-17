import loginReducer from './login'
import {combineReducers} from 'redux'
import categoryReducer from './category'
import headerReducer from './header'




export default combineReducers({
    userInfo:loginReducer,
    headerTitle:headerReducer,
    categoryList:categoryReducer
})
