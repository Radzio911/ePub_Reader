import axios, { type AxiosInstance } from "axios"
import { useCookies } from "react-cookie";



const useApi = (): AxiosInstance => {
    const [cookies] = useCookies(['token']);
    return axios.create({
        baseURL: "http://localhost:5555",
        headers:{
            TOKEN: cookies.token,
            "Content-Type": "Application/JSON"

        }


    })
    }


export default useApi



