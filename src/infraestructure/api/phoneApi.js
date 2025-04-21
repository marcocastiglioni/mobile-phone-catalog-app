const API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

async function fetchFromApi(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        ...options
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();

    } catch( error ) {
        const message = error instanceof Error ? error.message : '';
        throw new Error(`API fetch error: ${message}`);
    }

}

export async function fetchPhones({ limit = '20', search = '' } = {}) {

    console.log(`Fetch Phones params: limit ${limit} - search ${search}`);

    let endpoint = '/phones';
    const queryParams = [];

    if (limit) {
        queryParams.push(`limit=${limit}`);
    }

    if (search) {
        queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (queryParams.length > 0) {
        endpoint += `?${queryParams.join('&')}`;
    }

    console.log(endpoint);

    return fetchFromApi(endpoint);
}

export default fetchFromApi;