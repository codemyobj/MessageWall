/**
 * Environment configuration
 * baseURL: API base URL
 * routerMode: Router mode (hash/history)
 * baseSSOURL: SSO service base URL
 */

let baseURL = ''
let routerMode = 'hash'
let baseSSOURL

// import.meta.env.DEV is a Vite environment variable that is true during development
if (import.meta.env.DEV) {
  baseURL = 'http://localhost:3000'
  baseSSOURL = 'http://localhost:3000'
} else {
  baseURL = 'https://www.huohuo90.com:3002'
  baseSSOURL = 'https://www.huohuo90.com:3003'
}

export { baseURL, baseSSOURL, routerMode }
