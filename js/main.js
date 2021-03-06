const btns = document.querySelectorAll('.btn')
const winMessage = document.querySelector('h2')
const newGameBtn = document.getElementById('new').addEventListener('click', resetAll)

class Game {
  constructor() {
    this.winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
      ]
    this.board = ['', '', '', '', '', '', '', '', '']
    this.curTurn = 'X'
    this.hasWinner = false
    this.turnNumber = 0
  }

  toggleTurn() {
    if (this.curTurn === 'X') {
      this.curTurn = 'O'
    } else {
      this.curTurn = 'X'
    }
  }

  isWin(symbol) {
    let result = true

    for (let i = 0; i < this.winConditions.length; i++) {
      let condition = this.winConditions[i]
      for (let j = 0; j < condition.length; j ++) {
        let element = condition[j]
        if (this.board[element] != symbol) {
          result = false
        }
      }

      if (result) {
        return true
      }

      result = true
    }

    return false
  }

  restart() {
    this.curTurn = 'X'
    this.board = ['', '', '', '', '', '', '', '', '']
    this.hasWinner = false
    this.turnNumber = 0
  }


  processMove(symbol) {
    if (this.isWin(symbol)) {
      gameBoard.setWinMessage(`${symbol} won!!`)
      this.hasWinner = true
    }

    this.turnNumber++

    if (this.turnNumber === 9 && this.hasWinner === false) {
      gameBoard.setWinMessage('DRAW')
    }

    this.toggleTurn()
  }

}




class BoardGUI {
  constructor() {
    
  }

  markBox() {
    let turn = 0

    for (const btn of btns) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        
        turn++
        console.log(turn)
    
        if (btn.innerText.length === 0 && game.hasWinner === false) {
          btn.innerText = game.curTurn
          game.board[btn.id] = game.curTurn
          game.processMove(game.curTurn)
          printGameState()
        }
      })
    }
  }

  setWinMessage(message) {
    winMessage.classList.add('active')
    winMessage.innerText += message 
  }

  restart() {
    for (const btn of btns) {
      btn.innerText = ''
    }

    winMessage.classList.remove('active')
    winMessage.innerText = ''
  }
}


function resetAll() {
  game.restart()
  gameBoard.restart()
}

function printGameState() {
  console.log(game.board)
  console.log(game.isWin('X'))
  console.log(game.isWin('O'))
}



let gameBoard = new BoardGUI()

let game = new Game()

gameBoard.markBox()