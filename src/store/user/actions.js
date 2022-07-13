import axios from "axios";
// import router from "../../router";

export const actionUser = async (context, body) => {

    const res = await axios.post("auth/login", body).catch( (error) => {
        context.commit("SET_STATUS_REQUEST_LOGIN",error.response.status)
      });
    
    //let fullName = res.data.data.user.fullName
    let last_name = res.data.data.user.last_name
    let photo = res.data.data.user.photo
    let date_birth = res.data.data.user.date_birth
    let email = res.data.data.user.email
    let id_country = res.data.data.user.id_country
    let name = res.data.data.user.name
    let biography = res.data.data.user.biography
    let status_preference = res.data.data.user.status_preference
    let city = res.data.data.user.city
    let id_user = res.data.data.user.id
    let rol = res.data.data.user.roles[0].id

    let id_account_type = res.data.data.user.id_account_type    /* hice esto */

    //context.commit("SET_NAME",fullName)

    let authToken = res.data.data.access_token;
    
    localStorage.setItem("rol_user", rol)
    localStorage.setItem("id_user", id_user);
    localStorage.setItem("access_token", authToken);
    localStorage.setItem("status_preference", status_preference);
    //localStorage.setItem("fullName_user", fullName);
    localStorage.setItem("name_user", name);
    localStorage.setItem("last_name_user", last_name);
    localStorage.setItem("photo_user", photo);
    localStorage.setItem("date_birth_user", date_birth);
    localStorage.setItem("email_user", email);
    localStorage.setItem("country_user", id_country);
    localStorage.setItem("biography_user", biography);
    localStorage.setItem("city", city);


    localStorage.setItem("id_account_type",id_account_type);  /* hice esto */


    // if (statususer == 1) {
    //     this.$router.push('/preferences')

    // } else if(statususer == 0) {
    //     window.location.reload(true);
    // this.$router.push('/home')
    // }
    
    window.location.reload(true);

}