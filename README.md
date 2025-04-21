
# Mobile Phone Catalog App

A Next.js application for Mobile Phone Catalog App.


## Authors

- [@marcocastiglioni](https://github.com/marcocastiglioni/)


## Tech Stack

**Client:** Next.js v15, TailwindCSS v4, SASS 

**Server:** Node v18


## Step-by-Step Instructions to Installation

#### 1. Open your Terminal
#### 2. Install NVM using cURL or wget:
- Using cURL:
```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
- Using wget:
```bash
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

#### 3. Install Node
```bash
  nvm install 18
  nvm use 18
  node --version
```
This should print the installed Node.js version, for example, v18.x.x.

#### 4. Clone the repository:
```bash
  git clone https://github.com/marcocastiglioni/mobile-phone-catalog-app.git
```

#### 5. Change to the project directory:

```bash
  cd mobile-phone-catalog-app
```

#### 6. Install dependencies:

```bash
  npm install
```

#### 7. Create an empty .env.local file:

```bash
  touch .env.local
  code .
```
This will open the Editor, for example Visual Studio Code

Then, edit the .env.local file (using your preferred editor) to set the necessary variables:

```bash
API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com/products
API_KEY=ask-for-the-api-key
```

#### 8. Start the development server:

```bash
  npm run dev
```

#### 9. To build and run the application in production mode locally:

```bash
  npm run build
```

#### 10. Start the production server:

```bash
  npm run start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_URL`
`API_KEY`


## API Reference

Get all phones data using React Query

```http
  GET /api/phone?limit=${limit}&offset=${pageParam}
```

Get a specific phone by ID

```http
  POST /api/phone/${id}
```





## Demo

https://mobile-phone-catalog-1ssz8hony-marcocastiglionis-projects.vercel.app/

