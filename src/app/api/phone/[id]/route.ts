import { Phone } from "@/types/phone";
import { NextResponse } from "next/server";

export async function GET( request: Request ) {
    
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const productId = pathParts[pathParts.length - 1];
    
    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_KEY;
    
    if ( !API_KEY || !API_URL ) {
        console.error('Missing environment variables: API_URL or API_KEY');
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        );
    }

    try {

        const detailsUrl = `${API_URL}/${productId}`;
    
        const response = await fetch(detailsUrl, {
            headers: {
                'x-api-key': API_KEY
            },
            next: {
                revalidate: 3600 // Cache for 1 hour
            }
        });

        if ( response.ok ) {
            const data = await response.json();
            return NextResponse.json(data);
        }

        // If fails then fallback to PhoneList page and filter for the specific product
        if ( response.status === 404 ) {
            const allProductsResponse = await fetch(API_URL, {
                headers: {
                    'x-api-key': API_KEY
                },
                next: {
                    revalidate: 3600
                }
            });

            if ( allProductsResponse.ok ) {
                const data = await allProductsResponse.json();
                
                const allProducts = Array.isArray(data) 
                    ? data 
                    : (data.data && Array.isArray(data.data) 
                        ? data.data 
                        : []
                    );

                const product = allProducts.find(( p: Phone ) => p.id === productId);
        
                if ( product ) {
                  return NextResponse.json( product );
                }
              }
        }

        // If none of the cases above then no product was found
        return NextResponse.json(
            { error: `Product ${productId} not found` },
            { status: 404 }
        );

    } catch( error ) {
        console.error(`API route error ${error instanceof Error ? error.message : ''}`);
        return NextResponse.json(
            { error: 'Failed to fetch product details' },
            { status: 500 }
        );
    }
}