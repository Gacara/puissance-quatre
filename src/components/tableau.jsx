import React, {useState, useEffect} from "react";
import Row from "./row"

function initBoard(initPlayer) {
  let board = []
  for (let r = 0; r < 6; r++) {
    let row = [];
    for (let c = 0; c < 7; c++) {
      if(initPlayer === 2 && c === 3 && r === 5){
        row = [...row, 1]
      }
      else {row = [...row, null] }
    }
    board = [...board, row]
  }
  return board
}
export default function Tableau(){
  const [player1] = useState(1)
  const [player2] = useState(2)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [board, setBoard] = useState(initBoard(currentPlayer))
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("")

  function togglePlayer() {
    return (currentPlayer === player1) ? player2 : player1;
  }
  //iaAlgorythm(board)
  function iaAlgorythm(boardToCheck){
    const ia = togglePlayer()
    let safe = []
    let player1CanWin = []
    let player2CanWin = []
    // pour chaque colonne
    for (let c=0; c < 7 ; c++){

     // on check pour chaque joueur
      for(let numeroJoueur = 1; numeroJoueur <3; numeroJoueur++) {
        let newBoardToCheck = [...boardToCheck]
        let row;
    // on modifie le board avec l'ajout d'une cellule
        for (let r = 5; r >= 0; r--) {
          newBoardToCheck[r] = [...boardToCheck[r]]
          if (!newBoardToCheck[r][c]) {
            newBoardToCheck[r][c] = numeroJoueur
            row = r
            break;
          }
        }
  
        let result = checkAll(newBoardToCheck);
        console.log(result)
        if(result === player1) player1CanWin = [...player1CanWin, c]
        else if(result === player2) player2CanWin = [...player2CanWin, c]
        else safe = [...safe, {c, row}] 
      }
    } 

   const safeMoves = checkSafeMove(safe)
   console.log(safeMoves)
    if(ia === player1){
      if(player1CanWin.length > 0) return player1CanWin[Math.floor(Math.random() * player1CanWin.length)];
      if(player2CanWin.length > 0) return player2CanWin[Math.floor(Math.random() * player2CanWin.length)];
      return safeMoves[Math.floor(Math.random() * safeMoves.length)].c;
    } else {
      if(player2CanWin.length > 0) return player2CanWin[Math.floor(Math.random() * player2CanWin.length)];
      if(player1CanWin.length > 0) return player1CanWin[Math.floor(Math.random() * player1CanWin.length)];
      return safeMoves[Math.floor(Math.random() * safeMoves.length)].c;
    }
  }

  function checkSafeMove(safe){
    const playCenter = safe.filter((move) => move.c >= 2 && move.c < 5 && move.row === 5)

    if (playCenter.length >= 1){
      return playCenter
    }
    return safe
  }

  function checkResult(newBoard){
    let result = checkAll(newBoard);
      if (result === player1) {
        endGame(newBoard, 'Player 1 (red) wins!')
      } else if (result === player2) {
        endGame(newBoard, 'Player 2 (yellow) wins!')
      } else if (result === 'draw') {
        endGame(newBoard, 'Draw game.')
      } else {
        checkIaVictory(newBoard)
      }
  }

  function checkIaVictory(newBoard){
    const newIaMove = iaAlgorythm(newBoard)
          for (let r = 5; r >= 0; r--) {
            if (!newBoard[r][newIaMove]) {
              newBoard[r][newIaMove] = togglePlayer();
              break;
            }
          }
    let result = checkAll(newBoard);
    if (result === player1) {
      endGame(newBoard, 'Player 1 (red) wins!')
    } else if (result === player2) {
      endGame(newBoard, 'Player 2 (yellow) wins!')
    } else if (result === 'draw') {
      endGame(newBoard, 'Draw game.')
    } else {
      setBoard(newBoard)
    }
  }
  
  function play(c) {
    if (!gameOver) {
      let newBoard = [...board];
      for (let r = 5; r >= 0; r--) {
        if (!newBoard[r][c]) {
          newBoard[r][c] = currentPlayer;
          break;
        }
      }
      checkResult(newBoard)

    } else {
      setMessage('Game over. Please start a new game.')
    }
  }
  
  function checkVertical(board) {
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
            return board[r][c];    
          }
        }
      }
    }
  }
  
  function checkHorizontal(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  function checkDiagonalRight(board) {
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  function checkDiagonalLeft(board) {
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  function checkDraw(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  function checkAll(boardToCheck) {
    return checkVertical(boardToCheck) || checkDiagonalRight(boardToCheck) || checkDiagonalLeft(boardToCheck) || checkHorizontal(boardToCheck) || checkDraw(boardToCheck);
  }

  function endGame(newBoard, newMessage){
    setBoard(newBoard)
    setGameOver(true)
    setMessage(newMessage)
  }

  function resetGame(newPlayerPosition){
    setBoard(initBoard(newPlayerPosition))
    setMessage("")
    setGameOver(false)    
  }
  
function reversePlayer(){
  const newPlayerPosition = togglePlayer()
  resetGame(newPlayerPosition)
  setCurrentPlayer(newPlayerPosition)
}
    return (
      <div>
        <div className="button" onClick={() => resetGame(currentPlayer)}>New Game</div>
        <div className="button" onClick={reversePlayer}>{currentPlayer === 1 ? "Jouer en deuxième" : "Jouer en premier"}</div>
        <table>
          <thead>
          </thead>
          <tbody>
            {board.map((row, i) => (<Row key={i} row={row} play={play} />))}
          </tbody>
        </table>
        
        <p className="message">{message}</p>
      </div>
    );
}



