import styles from "./index.module.css";
import sqlLogo from "./assets/database.png";
import { useState } from "react";

function App() {
  const [queryDescription, setQueryDescritpion] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(queryDescription);
    const query = await generateQuery();
    setSqlQuery(query);
  };
  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    const data = await response.json();
    return data.answer;
  };
  return (
    <main className={styles.main}>
      <img src={sqlLogo} className={styles.icon} />
      <h3>Chat My Database</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="What question do you want to answer"
          onChange={(e) => {
            setQueryDescritpion(e.target.value);
          }}
        />
        <input type="submit" value="Generate Answer" />
      </form>
      {sqlQuery && <div className={styles.queryOutput}>{sqlQuery}</div>}
    </main>
  );
}

export default App;
