import {GET_CATEGORY_LIST} from '../action_types'
import {requestCategory} from '../../api/index'
import {message} from 'antd'



const createGetCategoryAction = (categoryList)=>({type:GET_CATEGORY_LIST,data:categoryList})


export const createGetCategoryAsyncAction = ()=>{
    return async (dispatch) => {
        let result = await requestCategory()
        const {status,data,msg} = result
        if (status === 0) {
            dispatch(createGetCategoryAction(data))
            
        }else{
            message.error(msg)
        }
        
    }
}