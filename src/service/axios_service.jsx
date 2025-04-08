import axios from "axios";
import { toast } from "react-toastify";

export const getAxios = async ({
    url
}) => {

    try {
        let response = await axios.get(url);

        
        if (response.status === 200) {
            if (response.data.status === 201 || response.data.status === 200) {
                return response.data
            } else if (response.data.status === 400) {
                toast.error(`${Object.entries(response.data.data)[0][0]}, ${Object.entries(response.data.data)[0][1]}`)
                return null
            } else if (response.data.status === 204) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 404 ||response.status === 404 ) {
                
                toast.error(response.data.message || response.message)
                return null
            } else {
                toast.error(response.message)
                return null
            }
        } else {
            toast.error(response.message)
            return null
        }
    } catch (err) { 
        if (err.code === "ERR_NETWORK") {
            return 'ERR_NETWORK'
        }
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        } else {
            toast.error(err.message)
        }
        return null
    }
}

export const getAxiosWithToken = async ({
    url
}) => {

    const token = JSON.parse(localStorage.getItem('login'))?.token;

    try {
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });

        
        if (response.status === 200) {
            if (response.data.status === 201 || response.data.status === 200) {
                return response.data
            } else if (response.data.status === 400) {
                toast.error(`${Object.entries(response.data.data)[0][0]}, ${Object.entries(response.data.data)[0][1]}`)
                return null
            } else if (response.data.status === 204) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 404 ||response.status === 404 ) {
                
                toast.error(response.data.message || response.message)
                return null
            } else {
                toast.error(response.message)
                return null
            }
        } else {
            toast.error(response.message)
            return null
        }
    } catch (err) { 
        if (err.code === "ERR_NETWORK") {
            return 'ERR_NETWORK'
        }
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        } else {
            toast.error(err.message)
        }
        return null
    }
}

export const postAxios = async ({
    url,
    body
}) => {

    try {
        let response = await axios.post(url, body);
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        }  else {
            toast.error(err.message)
        }
        return null
    }
}

export const postAxiosWithToken = async ({
    url,
    body
}) => {
    const token = JSON.parse(localStorage.getItem('login'))?.token;

    try {
        let response = await axios.post(url, body, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });
        if (response.status === 200) {
            if (response.data.status === 201 || response.data.status === 200) {
                return response.data
            } else if (response.data.status === 400) {
                toast.error(`${Object.entries(response.data.data)[0][0]}, ${Object.entries(response.data.data)[0][1]}`)
                return null
            } else if (response.data.status === 401) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 204) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 404) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 406) {
                toast.error(response.data.message)
                return null
            } else {
                toast.error(response.message)
                return null
            }
        } else {
            return null
        }
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        }  else {

            toast.error(err.message)
        }
        return null
    }
}

export const postAxiosFormWithToken = async ({
    url,
    body
}) => {
    const token = JSON.parse(localStorage.getItem('login'))?.token;

    try {
        let response = await axios.post(url, body, {
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) {
            if (response.data.status === 201 || response.data.status === 200) {
                return response.data
            } else if (response.data.status === 400) {
                toast.error(`${Object.entries(response.data.data)[0][0]}, ${Object.entries(response.data.data)[0][1]}`)
                return null
            } else if (response.data.status === 401) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 204) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 404) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 406) {
                toast.error(response.data.message)
                return null
            } else {
                toast.error(response.message)
                return null
            }
        } else {
            return null
        }
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        }  else {

            toast.error(err.message)
        }
        return null
    }
}

export const deleteAxiosWithToken = async ({
    url
}) => {
    const token = JSON.parse(localStorage.getItem('login'))?.token;

    try {
        let response = await axios.delete(url, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });

        if (response.status === 200) {
            if (response.data.status === 200) {
                return response.data
            } else if (response.data.status === 400) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 404) {
                toast.error(response.data.message)
                return null
            } else {
                toast.error(response.message)
                return null
            }
        } else {
            toast.error(response.message)
            return null
        }
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        }  else {

            toast.error(err.message)
        }
        return null
    }
}

export const putAxiosWithToken = async ({
    url,
    body
}) => {
    const token = JSON.parse(localStorage.getItem('login'))?.token;

    let response = await axios.put(url, body, {
        headers: {
            "Authorization": `Token ${token}`
        }
    });

    

    try {
        if (response.status === 200) {
            if (response.data.status === 200) {
                return response.data
            } else if (response.data.status === 400) {
                toast.error(`${Object.entries(response.data.data)[0][0]}, ${Object.entries(response.data.data)[0][1]}`)
                return null
            } else if (response.data.status === 204) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 404) {
                toast.error(response.data.message)
                return null
            } else if (response.data.status === 406) {
                toast.error(response.data.message)
                return null
            } else {
                toast.error(response.message)
                return null
            }
        } else {
            toast.error(response.message)
            return null
        }
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.setItem('authenticated', false)
            localStorage.removeItem('login')
            window.location.reload()
        }  else {

            toast.error(err.message)
        }
        return null
    }
}