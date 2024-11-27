export const predict = async({biography}:{biography: string}) => {
    try{
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({biography})
        })

        const result = await response.json();

        return result
    }
    catch(error){
        return (error as Error).message
    }
}