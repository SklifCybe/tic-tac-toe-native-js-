const CELLS = document.querySelectorAll('.cell');
const WINNER_RESULT = Array.from(document.querySelectorAll('.winner'));
const BOARD = document.querySelector('.main__board');
const RESET_BTN = document.querySelector('.reset-button');

const ANIMATION_CLASS = 'slow_cell';

let step = 'X';
let stepCounter = 0;

const toogleStep = (step) => (step === 'X' ? 'O' : 'X');

const clearBoard = () => {
  CELLS.forEach((el) => {
    el.innerText = '';
    el.className = el.className
      .split(' ')
      .filter((c) => c !== ANIMATION_CLASS)
      .join(' ');
  });
  step = 'X';
  stepCounter = 0;
};

const setWinnerInTable = (winner) => {
  const emptyCell = WINNER_RESULT.find((node) => node.textContent === '-');

  if (emptyCell) {
    emptyCell.textContent = winner;
  } else {
    const chars = WINNER_RESULT.map((el) => el.textContent);
    chars.unshift(winner);
    chars.pop();

    WINNER_RESULT.forEach((node, id) => {
      node.textContent = chars[id];
    });
  }
};

const setStep = (event) => {
  const value = event.target.innerText;
  event.target.className += ' ' + ANIMATION_CLASS;
  stepCounter++;

  if (value === '') {
    event.target.innerText = step;
    step = toogleStep(step);
  }

  const winner = getWinner(CELLS);

  if (winner || stepCounter === 9) {
    CELLS.forEach((el) => {
      el.className += ' ' + ANIMATION_CLASS;
    });

    // todo: after that you created your modal window, just delete setTimeout
    setTimeout(() => {
      if (winner) {
        setWinnerInTable(winner);
        alert(`${winner} is winner\nSteps: ${stepCounter}`);
      } else {
        setWinnerInTable('DRAW');
        alert(`This is draw. Try again\nSteps: ${stepCounter}`);
      }

      BOARD.removeEventListener('click', clickBoard);
      RESET_BTN.className += ' reset-button-active';
    }, 300);
  }
};

const getWinner = (cellsCollection) => {
  const cells = Array.from(cellsCollection).map((el) => el.innerText);

  if (cells[0] === cells[1] && cells[1] === cells[2] && !!cells[0]) return cells[0];
  if (cells[3] === cells[4] && cells[4] === cells[5]) return cells[3];
  if (cells[6] === cells[7] && cells[7] === cells[8]) return cells[6];

  if (cells[0] === cells[3] && cells[3] === cells[6]) return cells[0];
  if (cells[1] === cells[4] && cells[4] === cells[7]) return cells[1];
  if (cells[2] === cells[5] && cells[5] === cells[8]) return cells[2];

  if (cells[0] === cells[4] && cells[4] === cells[8]) return cells[0];
  if (cells[2] === cells[4] && cells[4] === cells[6]) return cells[2];

  return null;
};

const clickBoard = (event) => setStep(event);

BOARD.addEventListener('click', clickBoard);

RESET_BTN.addEventListener('click', () => {
  RESET_BTN.className = 'reset-button';
  clearBoard();
  BOARD.addEventListener('click', clickBoard);
});
