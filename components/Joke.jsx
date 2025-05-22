function Joke({ jokeItem }) {
  return (
    <div key={jokeItem.id}>
      <p>
        <strong>{jokeItem.setup}</strong>
      </p>
      <p>{jokeItem.punchline}</p>
    </div>
  );
}

export default Joke;
