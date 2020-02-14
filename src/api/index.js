import myAxios from './myAxios'

export const requestLogin = (username,password)=> myAxios.post('/login',{username,password})
