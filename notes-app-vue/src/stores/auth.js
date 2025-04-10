import axios from "axios";
import { reactive } from "vue";
import router from "@/router";

const url = "http://127.0.0.1:8000"

export const authStore = reactive({
    user : '',
    errors : '',
    /*************** Get Authenticated User ********************/
    async getUser() {
        if (localStorage.getItem('token')) {
            await axios
                .get(url + '/api/user', {
                    headers: {
                        authorization : `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                .then(({data}) => {
                    this.user = data;
                    this.errors = ''
                })
                .catch(error => {
                    console.error('Error:', error)
                })
        }
    },
    /******************* Login/Register ************************/
    async authenticate(route, formData) {
        await axios
            .post(url + `/api/${route}`,
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
            .then(({ data }) => {
                if (data.errors) {
                    console.error('Error:', data.errors)
                    this.errors = {                        
                        email : (data.errors.email.length > 0 ) ? data.errors.email[0] : '',
                    }
                    return
                }
                localStorage.setItem('token', data.token)
                this.user = data.user
                this.errors = ''
                router.push({name : 'home'})
            })
            .catch(error => {
                console.error('Error:', error)
                const err = error.response.data.errors;
                this.errors = {
                    name : (err.name.length > 0 ) ? err.name[0] : '',
                    email : (err.email.length > 0 ) ? err.email[0] : '',
                    password : (err.password.length > 0 ) ? err.password[0] : '',
                }
            })
    },
    /******************* Logout ************************/
    async logout() {
        await axios
            .post(url + `/api/logout`, authStore.user, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(({data}) => {
                this.user = null
                this.errors = ''
                localStorage.removeItem('token')
                router.push({name : 'home'})
            })
    }

})