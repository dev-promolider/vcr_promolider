import axios from "axios";
// import router from "../../router";

export const actionUser = async (context ,body)=>{

    const res = await axios.post("auth/login", body)

    console.log(res.data);
    let name = res.data.data.user.name
    let statususer = res.data.data.user.status_user
    context.commit("SET_NAME",name)

    console.log(res.data.data.user.status_user);
    console.log(res.data.data.user.name);
    
    
    let authToken = res.data.data.access_token;
    
    localStorage.setItem("access_token", authToken);
    localStorage.setItem("status_user", statususer);
    localStorage.setItem("name_user", name)

    if (statususer == 1) {
        this.$router.push('/preferences')
       
    } else if(statususer == 0) {
        window.location.reload(true);
        this.$router.push('/home')
    }
    // window.location.reload(true);
    
}