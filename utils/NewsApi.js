import axios from "axios";
import { newsApiKey } from "./ApiKey";

// https://newsapi.org/v2/everything?q=tesla&from=2024-06-06&sortBy=publishedAt&apiKey=f5f72874260c4cf288acf0710bbacdf0


const apiBaseUrl = "https://newsapi.org/v2"

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApiKey}`
const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApiKey}`
const discoverNewsUrl = (discover) => `${apiBaseUrl}/top-headlines?country=us&category=${discover}&apiKey=${newsApiKey}` 
const seearchNewsUrl = (query) => `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}` 

const newsApiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const res = await axios.request(options)
        return res.data        
    } catch (error) {
        console.log(error)
        return {}
    }
}

export const fetchBreakingNews = async () => {
    return await newsApiCall(breakingNewsUrl)
} 

export const fetchRecommendedNews = async () => {
    return await newsApiCall(recommendedNewsUrl)
} 

export const fetchDiscoverNews = async (discover) => {
    return await newsApiCall(discoverNewsUrl(discover))
} 

export const fetchSearchNews = async (query) => {
    const endpoint = seearchNewsUrl(query)
    return await newsApiCall(endpoint)
} 