export const getToken = () => {
    return (localStorage.getItem('accessToken'))
}
export const updateToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
}
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}
export const updateRefreshToken = (refreshToken) => {
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
}