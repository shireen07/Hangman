import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./Images/0.jpg";
import img1 from "./Images/1.jpg";
import img2 from "./Images/2.jpg";
import img3 from "./Images/3.jpg";
import img4 from "./Images/4.jpg";
import img5 from "./Images/5.jpg";
import img6 from "./Images/6.jpg";
import loser from "./Images/loser.jpg";

class Hangman extends Component {
  randomWord = randomWord();
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: this.randomWord,
      maxWrong: this.randomWord.length + 1,
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    if (this.state.nWrong < this.state.maxWrong) {
      this.setState(st => ({
        guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
      }));
    }
  }

  /* handleReset: will reset the game onclick 
  and select a new random word */
  handleRestart() {
    let newWord = randomWord()
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      answer: newWord,
      maxWrong: newWord.length + 1,
    }))
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        className="alphabet-btn"
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  render() {
    let gameOver = this.state.nWrong >= this.state.maxWrong;
    let resetButton = <button className="restart-btn" onClick={this.handleRestart}> ReStart </button>

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {!gameOver ?
          <img src={this.props.images[this.state.nWrong]}
            alt={`hangman ${this.state.nWrong}`}
          />
          :
          <img className="loser" src={loser} alt="you lose" />
        }

        <p>Wrong guesses: {this.state.nWrong}</p>
        {!gameOver ?
          <p className='Hangman-word'>{this.guessedWord()}</p>
          :
          <p className='Hangman-word'>{this.state.answer}</p>
        }

        {this.guessedWord().includes("_") ?
          !gameOver &&
          <p className='Hangman-btns'>{this.generateButtons()}</p>
          :
          <div>
            <p className="Winner">Hooray! You Won!</p>
            {resetButton}
          </div>
        }

        {gameOver && resetButton}

      </div>
    );
  }
}

export default Hangman;
