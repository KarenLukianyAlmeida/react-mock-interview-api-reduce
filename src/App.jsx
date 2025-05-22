import { useEffect, useState } from "react";
import Joke from "../components/Joke";

function App() {
  const [data, setData] = useState([]);
  const [jokesData, setJokesData] = useState([]);

  useEffect(() => {
    async function getJokes() {
      try {
        const response = await fetch(
          "https://official-joke-api.appspot.com/jokes/random/25"
        ).then((response) => response.json());

        setData(response);

        return response;
      } catch (error) {
        console.error(error);
      }
    }

    getJokes();
  }, []);

  useEffect(() => {
    function setJokes() {
      const result = data.reduce((jokesWithType, currentJoke) => {
        const type = currentJoke.type;
        if (!jokesWithType[type]) {
          jokesWithType[type] = [];
        }

        jokesWithType[type].push(currentJoke);

        return jokesWithType;
      }, {});

      const jokesArray = Object.entries(result);
      console.log(jokesArray);
      setJokesData(jokesArray);
    }

    setJokes();
  }, [data]);

  return (
    <>
      <section>
        <h1>JOKES</h1>
        {jokesData.map(([type, jokesArray]) => (
          <div key={type}>
            <h2>{type.toUpperCase()}</h2>
            {jokesArray.map((joke) => (
              <Joke jokeItem={joke} key={joke.id} />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
