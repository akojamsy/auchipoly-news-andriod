import { newsApiKey } from "../../../../utils/ApiKey";
import { baseApi } from "../baseApi";


export const newsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        reducerPath: "newsAPI",
        // getBreakingNews: builder.query({
        //     query: () => ({
        //         url: `top-headlines?country=us&apiKey=${newsApiKey}`,
        //         method: "GET"
                
        //     })
        // }),
        // getRecommendedNews: builder.query({
        //     query: () => ({
        //         url: `top-headlines?country=us&category=business&apiKey=${newsApiKey}`,
        //         method: "GET"
                
        //     })
        // }),
        getNews: builder.query({
            query: () => ({
                url: `news`,
                method: "GET"
            })
        }),
        getNewsCategories: builder.query({
            query: () => ({
                url: `categories`,
                method: "GET"
            })
        }),
        addNews:builder.mutation({
            query: (data) => ({
              url: 'news',
              method: 'POST',
              body: data,
            }),
          }),
    })
})

export const { useGetNewsQuery, useGetNewsCategoriesQuery, useAddNewsMutation } = newsApi