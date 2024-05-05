import axios from "axios"

export class ApiServiceClass {
    apiUrl: string
    authHeader: string | null

    constructor(apiUrl: string, authHeader: string | null = null) {
        this.apiUrl = apiUrl;
        this.authHeader = authHeader;
    }

    mapStatus(statuses?: number[]) {
        if (!statuses || !statuses.length) return ""

        return `?${statuses.map((status) => `Status=${status}`).join("&")}`
    }

    async request({ method, url, data, opts = {}, isSecondTry }: any): Promise<any> {
        const user = {}; //await getUser()
        const arg = [this.apiUrl + url]

        if (method !== "get") {
            arg.push(data)
        }

        if (!opts.headers) {
            opts.headers = {}
        }
        // opts.headers.Authorization = this.authHeader
        // if (!opts.headers.Authorization && user?.access_token) {
        //   opts.headers.Authorization = `Bearer ${user.access_token}`;
        // }

        arg.push(opts)

        if (method === "delete") {
            const options = arg.pop() as any
            if (options) {
                options.data = arg.pop()
                arg.push(options)
            }
        }
        try {
            // @ts-ignore
            const response = await axios[method](...arg)
            return response.data
        } catch (e) {
            throw e
        }
    }

    get(url: string, opts?: any) {
        return this.request({ method: "get", url, opts })
    }

    post(url: string, data?: any, opts?: any) {
        return this.request({ method: "post", url, data, opts })
    }

    put(url: string, data?: any, opts?: any) {
        return this.request({ method: "put", url, data, opts })
    }

    delete(url: string, data?: any, opts?: any) {
        return this.request({ method: "delete", url, data, opts })
    }
}

export const ApiService = new ApiServiceClass(process.env.BACKEND_SERVER_URL ?? "http://localhost:4000/api")
