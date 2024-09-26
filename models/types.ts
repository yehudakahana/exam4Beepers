

export interface User{
    userName: string,
    password: string,
    id ?: string,
    bookes ?: Book[]
}

export interface Book{
    title: string,
    author: string,
    id ?: string
}