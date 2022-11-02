import { useState } from "react"

export const useFetching = (callback) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try{
            setIsLoading(true);
            await callback(...args);
        }
        catch (err){
            setError(err.message);
        }
        finally{
            setIsLoading(false);
        }
    }
    return [fetching, isloading, error]
}