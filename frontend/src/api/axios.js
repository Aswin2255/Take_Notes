import Axios from 'axios'
//const bu = 'http://localhost:3001/api'
const bu = 'http://65.2.141.17/api'
const instance = Axios.create({
    baseURL:bu,
    withCredentials:true
})
export default instance