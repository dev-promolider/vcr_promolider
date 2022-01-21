import axios from "axios";
import router from "../../router";

export const actionUser = async (context ,body)=>{

    const res = await axios.post("auth/login", body)

    console.log(res.data);
    let name = res.data.data.user.name
    let statususer = res.data.data.user.status_user
    context.commit("SET_NAME",name)

    console.log(res.data.data.user.status_user);
    console.log(res.data.data.user.name);
    // let fullname = res.data.data.user.fullname
    // let lastname = res.data.data.user.last_name
    // let datebirth = res.data.data.user.date_birth
    // let email = res.data.data.user.email
    
    let authToken = res.data.data.access_token;
    
    // commit("SET_FULLNAME", fullname)
    // commit("SET_LASTNAME", lastname)
    // commit("SET_DATEBIRTH", datebirth)
    // commit("SET_EMAIL", email)
    // commit("SET_STATUSUSER", statususer)
    localStorage.setItem("access_token", authToken);
    localStorage.setItem("status_user", statususer);
    localStorage.setItem("name_user", name)

    if (statususer == 0) {
        router.push('/preferences')
    } else {
        router.push('/home')
    }
    //window.location.reload(true);
    
}