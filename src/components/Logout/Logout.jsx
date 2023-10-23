import { AuthContext } from '~/contexts/AuthContext'
import { useState, useEffect, useContext } from 'react'



export default function Logout(){
    const { setUserCurrent, setAccessToken, setRefreshToken } = useContext(AuthContext)
    console.log("Đăng xuất")
    const logout = ()=>{
        setUserCurrent(null)
        setAccessToken(null)
        setRefreshToken(null)
        console.log("Đăng xuất 1")
    }

    return(
        <>{logout}</>
    )
}