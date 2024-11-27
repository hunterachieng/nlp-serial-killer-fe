import { NextResponse } from "next/server";

export const POST  = async(request:Request) => {

    const data = await request.json()

    try{
        const response = await fetch('http://ec2-51-20-91-153.eu-north-1.compute.amazonaws.com:7070/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();

        return new NextResponse(JSON.stringify(result), {
            status: 200
        })
    }
    catch(error){
        return new NextResponse((error as Error).message, {
            status: 500
        })
    }

}