import axios from "axios";
import { reactive } from "vue";
import router from "@/router";
import { authStore } from "./auth";

const url = 'http://127.0.0.1:8000'

export const noteStore = reactive({
    errors : '',
    /***************** GET ALL NOTES *****************/
    async getAllNotes() {
        let response = {}
        await axios
        .get(url + '/api/notes')
        .then(({data}) => {
            response = data
        })
        return response;
    },
    /***************** GET SPECIFIC NOTE *****************/
    async getNote(note) {
        let response = {}
        await axios
        .get(url + `/api/notes/${note}`)
        .then(({data}) => {
            response = data            
        })
        return response.note;
    },
    /**************** CREATE A NEW NOTE ****************/
    async createNote(formData) {
        await axios
        .post(url + '/api/notes',
            formData,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(() => {
            router.push({name : 'home'})
        })
        .catch(error => {
            console.error(error)
            this.errors = error.response.data.errors
        })
    },
    /***************** DELETE NOTE *****************/
    async deleteNote(note) {
        const isOwner = authStore.user.id === note.user_id
        if (isOwner) {
            await axios
            .delete(url + `/api/notes/${note.id}`,                
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(() => {
                router.push({name : 'home'})
            })
            .catch(error => {
                this.errors = error.response.data.errors
                console.error(this.errors)
            })            
        } 
    },
    /**************** UPDATE A NOTE ****************/
    async updateNote(note, formData) {
        const isOwner = authStore.user.id === note.user_id

        if (isOwner) {
            await axios
            .put(url + `/api/notes/${note.id}`,
                formData,                
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(() => {
                this.errors = ''
                router.push({name : 'home'})
            })
            .catch(error => {
                this.errors = error.response.data.errors
                console.error(this.errors)
            })            
        } 
    },
})