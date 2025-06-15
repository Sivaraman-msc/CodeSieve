import axios from 'axios'
import cookie from 'js-cookie'

const BASE_URL='http://localhost:3000/CodeSieve/Interview'

const getAuthHeader=()=>({
    headers:{
        authorization:`Bearer ${cookie.get('token')}`
    }
})

export const CreateInterviewService=async(formdata)=>{
    try{
        const res=await axios.post(`${BASE_URL}/createInterview`,formdata,getAuthHeader())
        return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export const GetInterviewService=async()=>{
    try{
        const res=await axios.get(`${BASE_URL}/getInterview`,getAuthHeader())
        return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}