import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') || '20');
    const offset = Number(url.searchParams.get('offset') || '0');

    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_URL || !API_KEY) {
        console.error('Missing environment variables: API_URL or API_KEY');
        return NextResponse.json(
            { error: 'Server configuration error' }, 
            { status: 500 }
        );
    }

    try {
        
        const response = await fetch(API_URL, {
            headers: {
                'x-api-key': API_KEY
            },
            next: {
                revalidate: 3600
            }
        })
        
        if (!response.ok) {
            console.error(`API responded with status: ${response.status}`);
            return NextResponse.json(
                { error: `API responded with status: ${response.status}` }, 
                { status: response.status }
            );
        }

        const phonesData = await response.json();

        // Apply pagination to the data
        const paginatedData = Array.isArray( phonesData ) 
            ? phonesData.slice(offset, offset + limit) 
            : [];

        // Return paginated data with totaal count for client-side calculation
        return NextResponse.json({
            data: paginatedData,
            pagination: {
                total: Array.isArray( phonesData ) ? phonesData.length : 0,
                offset,
                limit,
                hasMore: offset + limit < (Array.isArray( phonesData ) ? phonesData.length : 0)
            }
        });

    } catch ( error ) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch phones' }, 
            { status: 500 }
        );
    }
}