import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Style for individual square
const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'black'
};

// Style for the board
const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexWrap': 'wrap',
  'border': '3px #eee solid'
};

// Style for the container
const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
};

// Style for the instructions
const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
};

// Style for the button
const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
};

// Square component represents an individual square
const Square = ({ playerChoice, onClick }) => {
  return (
    <button className="square" onClick={onClick} style={squareStyle}>
      {playerChoice}
    </button>
  );
};

// Board component represents the tic-tac-toe board
const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill("")); // State for storing square values
  const [isX, setX] = useState(true); // State for tracking the current player. Start at X

  // Event handler for square click. Checks to see if winner exist or if square is already occupied
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isX ? 'X' : 'O'; // Update the value of the clicked square to X or O
    setSquares(squares); // Update the squares state
    setX(!isX); // Toggle the current player
  };

  const winner = calculateWinner(squares); // Check if there is a winner
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isX ? 'X' : 'O'}`;
  }

  // Event handler for restart button click
  const handleRestart = () => {
    setX(true); // Set the first player as 'X'
    setSquares(Array(9).fill(null)); // Reset the squares to initial state
  };

  return (
    <div style={containerStyle} className='board'>
      <div style={instructionsStyle} className="status">{status}</div>
      <button style={buttonStyle} className="restart" onClick={handleRestart}>Restart!</button>
      <div style={boardStyle} className="board-row">
        <Square playerChoice={squares[0]} onClick={() => handleClick(0)} />
        <Square playerChoice={squares[1]} onClick={() => handleClick(1)} />
        <Square playerChoice={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div style={boardStyle} className="board-row">
        <Square playerChoice={squares[3]} onClick={() => handleClick(3)} />
        <Square playerChoice={squares[4]} onClick={() => handleClick(4)} />
        <Square playerChoice={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div style={boardStyle} className="board-row">
        <Square playerChoice={squares[6]} onClick={() => handleClick(6)} />
        <Square playerChoice={squares[7]} onClick={() => handleClick(7)} />
        <Square playerChoice={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

// Render the Board component to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Board playerChoice={'x'} />
  </React.StrictMode>,
);

// Function to calculate the winner based on the current squares
function calculateWinner(squares) {
  //represents horizontal vertical and diagonal winning patterns
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  return null; // Return null if there is no winner
}
