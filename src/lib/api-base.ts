const FALLBACK_BACKEND_API_URL = 'https://grocery-api.shotlin.in/api/v1'

export function getClientApiBase() {
    return process.env.NEXT_PUBLIC_API_URL || '/api/v1'
}

export function getServerApiBase() {
    return process.env.INTERNAL_API_URL || FALLBACK_BACKEND_API_URL
}
