import React, { useEffect, useState } from 'react'
import { GetInterviewService } from '../../Service/InterviewService'

export default function GetInterview() {
    const[formdata,setFormdata]=useState([])

    useEffect(()=>{
        const fetchInterview=async()=>{
            await GetInterviewService()
            .then(res=>setFormdata(res.interview))
            .catch(err=>console.log(err))
        }
        fetchInterview()
    },[])
  return (
    <div>
        <h1>Interview</h1>
        {formdata.map((interview,count)=>(
            <div key={interview._id}>
                <h2>{count+1}. {interview.title}</h2>
                <p>Assigned to :{interview.candidateEmail} </p>
                <p>DeadLine : {interview.deadline}</p>
                <p>Duration : {interview.durationInMinutes} </p>
            </div>
        ))}
    </div>
  )
}
