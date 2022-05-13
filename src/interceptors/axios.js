import axios from "axios"
import { push } from "svelte-spa-router"

axios.defaults.baseURL = 'http://localhost:8000/api/'

let refreshed = false

axios.interceptors.response.use(resp => resp, async (error) => {
    if (error.response.status === 401 && !refreshed) {
        refreshed = true

        const response = await axios.post('auth/refresh', {}, {withCredentials: true})

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

            return axios(error.config)
        }
    }

    refreshed = false

    return error
})