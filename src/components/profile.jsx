import { useState, useEffect } from "react";
import "../css/profile.css";
import { useOutletContext, useNavigate} from "react-router-dom";
import APIservice from "../APIService";
import Session from "../profile-components/training-history";

export default function Profile() {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();
  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await APIservice.profile();
      if (userInfo) {
        const { username, password } = userInfo;
        setUsername(username);
        setPassword(password);
        setIsAuthenticated(true);
      } else {
        navigate('/register')
      }
    };
    getProfile();
  }, []);


  return (
    <div className="profileContainer">
      <div className="userInfo">
      </div>
      <div className="trainingHistory"></div>
    </div>
  );
}
