import { useState } from "react";
import axios from "axios";
import "./App.css";

interface Avatar {
  url: string;
  public_id: string;
  _id: string;
}

interface CoverImage {
  url: string;
  public_id: string;
  _id: string;
}

interface User {
  readonly _id: string;
  username: string;
  email: string;
  fullname: number;
  avatar: Avatar;
  coverImage: CoverImage;
  watchedHistory: [];
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response);
      setUser(response.data.data.user); // Store the response data in state
    } catch (err) {
      console.error(err);
    }
  };

  console.log(user);

  return (
    <>
      <h1>Testing backend</h1>
      {user ? <h2>welcome {user?.fullname}</h2> : <p>Please log in</p>}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => loginUser()}>Login</button>
    </>
  );
}

export default App;
