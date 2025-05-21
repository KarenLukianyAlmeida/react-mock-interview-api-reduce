import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [jokesData, setJokesData] = useState({});

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

      console.log(result);
      setJokesData(result);
    }

    setJokes();
  }, [data]);

  return (
    <>
      <section>
        <h1>JOKES</h1>
        {Object.entries(jokesData).map(([type, jokesArray]) => {
          return (
            <div key={type}>
              <h2>{type.toUpperCase()}</h2>
              {jokesArray.map((joke) => {
                return (
                  <>
                    <p>
                      <strong>{joke.setup}</strong>
                    </p>
                    <p>{joke.punchline}</p>
                  </>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
