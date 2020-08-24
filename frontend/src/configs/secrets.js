export const ENVIRONMENT = process.env.NODE_ENV

export const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER

if (!BACKEND_SERVER) {
  console.error('No Phytium New Fundation BACKEND_SERVER uri. Set REACT_APP_BACKEND_SERVER environment variable.')
}
