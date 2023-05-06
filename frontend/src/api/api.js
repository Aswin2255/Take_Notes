import axiosinstance from "./axios"

export const signUp =  (url,data)=>{
   return axiosinstance.post(url,{data})
}
export const logIn = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const addJob = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const getAllclientjobs = (url,data)=>{
    return axiosinstance.get(url)
}
export const getAlljobs = (url,data)=>{
    return axiosinstance.get(url)
}
export const applyJob = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const getAppliedjob = (url,data)=>{
    return axiosinstance.get(url)
}
export const getjobreq = (url)=>{
    return axiosinstance.get(url)
}
export const logOut = (url,sessionid)=>{
    return axiosinstance.post(url,{sessionid})
}
export const adminLogin = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const getAlluser = (url,data)=>{
    return axiosinstance.get(url)
}
export const getUsersession = (url)=>{
    return axiosinstance.get(url)
}
export const blockUnblock = (url,data)=>{
    return axiosinstance.patch(url,{data})
}
export const createPost = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const getAllpost = (url)=>{
    return axiosinstance.get(url)
}
export const updatePost = (url,data)=>{
    return axiosinstance.patch(url,{data})
}
export const deletePost = (url)=>{
    return axiosinstance.delete(url)
}