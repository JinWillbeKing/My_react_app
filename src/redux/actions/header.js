import {SAVE_TITLE,DELETE_TITLE} from '../action_types'


export const createSaveTitleAction = (title) => {
    return {type:SAVE_TITLE,data:title}
}
export const createDeleteTitleAction = () => {
    return {type:DELETE_TITLE,data:''}
}