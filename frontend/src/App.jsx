import "./App.css";
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const [learnSkill, setLearnSkill] = useState("");
  const [learnSkills, setLearnSkills] = useState([]);

  const [searchSkill, setSearchSkill] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [matches, setMatches] = useState([]);

  const [credits, setCredits] = useState(0);

  const [rating, setRating] = useState(0);

  // Register
const handleRegister = () => {

  alert("Registered Successfully");

  localStorage.setItem("email", email);

  setIsLoggedIn(true);

};
 

  // Login
  const handleLogin = () => {

  alert("Login Successful");

  localStorage.setItem("email", email);

  setIsLoggedIn(true);

};

    
  // Add Skill
  const handleAddSkill = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/add-skill",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          skill
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    setSkills(data.skills);
  };

  // Delete Skill
  const handleDeleteSkill = async (skillName) => {

    const response = await fetch(
      "http://localhost:5000/api/auth/delete-skill",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          skill: skillName
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    setSkills(data.skills);
  };

  // Add Learn Skill
  const handleAddLearnSkill = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/add-learn-skill",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          skill: learnSkill
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    setLearnSkills(data.skillsLearn);
  };

  // Search Skill
  const handleSearchSkill = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/search-skill",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          skill: searchSkill
        })
      }
    );

    const data = await response.json();

    setSearchResults(data);
  };

  // Find Matches
  const handleFindMatches = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/find-matches",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          skill: learnSkill
        })
      }
    );

    const data = await response.json();

    setMatches(data);
  };

  // Teach Session
  const handleTeach = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/update-credits",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          action: "teach"
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    setCredits(data.credits);
  };

  // Learn Session
  const handleLearn = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/update-credits",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          action: "learn"
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    setCredits(data.credits);
  };

  // Rate User
  const handleRateUser = async () => {

    const response = await fetch(
      "http://localhost:5000/api/auth/rate-user",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          rating
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    setRating(data.rating);
  };

  // LOGIN PAGE
  if (!isLoggedIn) {

    return (
    <div className="login-container">

  <div className="login-box">

    <h1>Swapify</h1>

    <p>Login or Register</p>

    <input
      type="text"
      placeholder="Enter your name"
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="email"
      placeholder="Enter your email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Enter your password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <input
      type="text"
      placeholder="Enter your bio"
      onChange={(e) => setBio(e.target.value)}
    />

    <button onClick={handleRegister}>
      Register
    </button>

    <button onClick={handleLogin}>
      Login
    </button>

  </div>
 
</div>

    )
  }

  // MAIN WEBSITE
  return (

    <div className="container">

      <h1>Welcome To Swapify</h1>

      <h3>Credits: {credits}</h3>

      <h3> Rating: {rating}</h3>

      <div className="section">

        <h2>Add Teaching Skill</h2>

        <input
          type="text"
          placeholder="Enter your skill"
          onChange={(e) => setSkill(e.target.value)}
        />

        <button onClick={handleAddSkill}>
          Add Skill
        </button>

      </div>

      <h3>Your Skills:</h3>

      <ul>
        {skills.map((item, index) => (
          <li key={index}>

            {item}

            <button onClick={() => handleDeleteSkill(item)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

      <div className="section">

        <h2>Add Learning Skill</h2>

        <input
          type="text"
          placeholder="Skill you want to learn"
          onChange={(e) => setLearnSkill(e.target.value)}
        />

        <button onClick={handleAddLearnSkill}>
          Add Learn Skill
        </button>

        <button onClick={handleFindMatches}>
          Find Matches
        </button>

      </div>

      <h3>Skills To Learn:</h3>

      <ul>
        {learnSkills.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="section">

        <h2>Search Skills</h2>

        <input
          type="text"
          placeholder="Search skill"
          onChange={(e) => setSearchSkill(e.target.value)}
        />

        <button onClick={handleSearchSkill}>
          Search Skill
        </button>

      </div>

      <div className="section">

        <h2>Session Actions</h2>

        <button onClick={handleTeach}>
          Teach Session
        </button>

        <button onClick={handleLearn}>
          Learn Session
        </button>

      </div>

      <div className="section">

        <h2>Rate User</h2>

        <input
          type="number"
          placeholder="Rate from 1 to 5"
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={handleRateUser}>
          Rate User
        </button>

      </div>

      <h3>Best Matches:</h3>

      <div className="results-container">

        {matches.map((user, index) => (

          <div className="user-card" key={index}>

            <h2>{user.name}</h2>

            <p>{user.bio}</p>

            <p>Rating: {user.rating}</p>

            <div className="skill-box">

              <strong>Teaches:</strong>

              <p>{user.skillsTeach.join(", ")}</p>

            </div>

          </div>

        ))}

      </div>

      <h3>Search Results:</h3>

      <div className="results-container">

        {searchResults.map((user, index) => (

          <div className="user-card" key={index}>

            <h2>{user.name}</h2>

            <p>{user.bio}</p>

            <p>Rating: {user.rating}</p>

            <div className="skill-box">

              <strong>Teaches:</strong>

              <p>{user.skillsTeach.join(", ")}</p>

            </div>

            <div className="skill-box">

              <strong>Wants To Learn:</strong>

              <p>{user.skillsLearn.join(", ")}</p>

            </div>

          </div>

        ))}

      </div>
     <button
  className="logout-btn"
  onClick={() => setIsLoggedIn(false)}
>
  Logout
</button>
    </div>
  );
}

export default App;