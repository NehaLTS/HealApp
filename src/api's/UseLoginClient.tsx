import { useQuery, UseQueryResult } from 'react-query'
interface LoginResponse {
    existing?: string
    token?: string
    user?:
    {
        appleId: string
        client_id: number
        created_at: string
        email: string
        facebookId: string
        googleId: string
        password: string
    }
    message?: string
}
interface requestData {
    email: string;
    password: string;
}
export const UseLoginClient = () => {

    const loginAsClient = async (requestData: requestData | undefined): Promise<any> => {

        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': 'Logicease123',
        };

        const response = await fetch('https://heal-app.jocapps.com/api/users/loginByEmailID', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData),
        })

        const data = await response.json()
        if (data.error) throw new Error(data.error)
        // console.log("data", data)
        return data
    }
    const useLoginQuery = (requestData: requestData | undefined) => {
        const query = useQuery<LoginResponse, Error>(['loginAsClient', requestData], () => loginAsClient(requestData), {

            enabled: requestData != undefined, // You can set this to true when you're ready to execute the query
            onSuccess: (newData) => {
                // console.log("new data", newData)
            }
        });
        return query
    }
    return { useLoginQuery };
}




