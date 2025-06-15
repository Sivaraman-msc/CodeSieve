import axios from 'axios'
import cookie from 'js-cookie'

const BASE_URL='http://localhost:3000/CodeSieve/Data'

const getAuthHeader=()=>({
    headers:{
        authorization:`Bearer ${cookie.get('token')}`
    }
})

export const ViewSubmissionService=async()=>{
    try{
        const res=await axios.get(`${BASE_URL}/submissions`,getAuthHeader())
    return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}