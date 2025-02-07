import axios from "axios"
// import { LemonsqueezyClient } from "lemonsqueezy.ts";


export const lsqyConfig = {
    API_KEY: process.env.NEXT_PUBLIC_LEMONSQUEEZY_API,
    URL: "https://api.lemonsqueezy.com/v1"
}

// export const client = new LemonsqueezyClient(lsqyConfig.API_KEY as string);

export const headers = {
    Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                Authorization: `Bearer ${lsqyConfig.API_KEY}`
}
export const getProducts = async () => {
    try {

        const response = await axios.get(`${lsqyConfig.URL}/products`, {
            headers: {
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                Authorization: `Bearer ${lsqyConfig.API_KEY}`

            }
        })

        return response

    } catch (error) {
        console.error(error)
    }
}