import { QueryClient } from "@tanstack/react-query"

export const getQuearyClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60, //revalidation
            }
        }
    })
}