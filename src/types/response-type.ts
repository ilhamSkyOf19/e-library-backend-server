export type ResponseType<T> =
    { success: true, data: T }
    | { success: true, message: string }
    | { success: false, message: string }