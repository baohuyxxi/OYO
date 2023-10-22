export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}
export const updateToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
}
export const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem('refreshToken'))
}
export const updateRefreshToken = (refreshToken) => {
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
}