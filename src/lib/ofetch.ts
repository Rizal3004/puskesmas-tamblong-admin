import { ofetch } from 'ofetch'

// export const baseURL = 'http://127.0.0.1:8787'
export const baseURL = 'https://puskesmas-tamblong-server.puskesmas-tamblong-api.workers.dev'

const apiFetch = ofetch.create({ baseURL })

export default apiFetch
