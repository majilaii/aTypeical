import { useState, useEffect } from "react";
import '../css/profile.css'
import { useOutletContext } from "react-router-dom";
import APIservice from "../APIService";

export default function Profile() {

     const [username, setUsername] = useState(null)
     const [password, setPassword] = useState(null)
     const {isAuthenticated, setIsAuthenticated} = useOutletContext()
    useEffect(() => {
        const getProfile = async () => {
          const userInfo = await APIservice.profile();
          if (userInfo) {
           
            const { username , password } = userInfo;
            setUsername(username)
            setPassword(password)
            setIsAuthenticated(true)
          } else {
            console.log('No user info found');
          }
        };
        getProfile();
      }, []);
    return (
        <>
        <div className="details"> {username} </div>
        <div className="details"> {password} </div>
        </>
    )
}