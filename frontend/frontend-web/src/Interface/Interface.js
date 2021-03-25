import axios from 'axios'

const instance = axios.create({
    baseURL:"http://localhost:5000"
})
//Template for all Functions
export const f1 = async () => { 
    let users;
    users = (await instance.get("/users")).data.users;
 return users;
}

export const signup = async (Data) => { 
    //TODO: use request result
    await instance.post('/sign_up',Data,{headers: {
        "Content-Type": "application/json"}
    })
    
}

export const login = async (Data) => { 
    const res = await instance.post('/login',Data,{headers: {
        "Content-Type": "application/json"}
    })
    if(res.data['status_code']===200){
        return res.data['token']
    }
    else{
        return null;
    }
}

export const getCurrentCourses = async (Token, id, role) => { 
    const res = await instance.get(`/my_courses/${id}/${role}`,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": Token,
    },
    })
    console.log(res)
    return res.data
}