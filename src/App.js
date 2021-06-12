import "./App.scss";

function App() {
  return (
    <div className="trello-master">
      <nav className="navbar app">App bar</nav>
      <nav className="navbar board">Board bar</nav>
      <div className="board-columns">
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="https://trello-attachments.s3.amazonaws.com/60c36c736347af8daffd86cb/60c36c736347af8daffd86fb/x/16a1a98fd3ed16ea6fb25b16168878e4/giphy.gif"
                alt="alt-img"
              />
              Title: MERN
            </li>
            <li>Add what you'd like to work on below</li>
            <li>Add what you'd like to work on below</li>
            <li>Add what you'd like to work on below</li>
            <li>Add what you'd like to work on below</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              {/* <img
                src="https://trello-attachments.s3.amazonaws.com/60c36c736347af8daffd86cb/60c36c736347af8daffd86fb/x/16a1a98fd3ed16ea6fb25b16168878e4/giphy.gif"
                alt="alt-img"
              /> */}
              Title: MERN
            </li>
            <li>Add what you'd like to work on below</li>
            <li>Add what you'd like to work on below</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              {/* <img
                src="https://trello-attachments.s3.amazonaws.com/60c36c736347af8daffd86cb/60c36c736347af8daffd86fb/x/16a1a98fd3ed16ea6fb25b16168878e4/giphy.gif"
                alt="alt-img"
              /> */}
              Title: MERN
            </li>
            <li>Add what you'd like to work on below</li>
            <li>Add what you'd like to work on below</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              {/* <img
                src="https://trello-attachments.s3.amazonaws.com/60c36c736347af8daffd86cb/60c36c736347af8daffd86fb/x/16a1a98fd3ed16ea6fb25b16168878e4/giphy.gif"
                alt="alt-img"
              /> */}
              Title: MERN
            </li>
            <li>Add what you'd like to work on below</li>
            <li>Add what you'd like to work on below</li>
          </ul>
          <footer>Add another card</footer>
        </div>
      </div>
    </div>
  );
}

export default App;
