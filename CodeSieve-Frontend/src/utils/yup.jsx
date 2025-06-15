import * as yup from 'yup'

export const LoginValidation=yup.object({
    email:yup.string().email('Invalid Email').required('Email is required'),
    password:yup.string().required('Password is required')
}).required()

export const SignUpValidation=yup.object({
    name:yup.string().required('Name is required'),
    email:yup.string().email('Invalid email').required('Email is required'),
    password:yup.string().matches( /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,'Password must include at least one letter and one special character').min(8,'Minimum 8 characters required'),
    role:yup.string().oneOf(['Recruiter','Candidate'],'Invalid Role').required('Role is required')
}).required()