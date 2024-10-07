import { useState } from 'react';
import './App.css';

import Board from './components/board';

function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [sortAscending, setSortAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    const handlePlay = (nextSquares, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: { row, col } }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
    };

    const toggleSortOrder = () => {
        setSortAscending((prev) => !prev);
    };

    const moves = history.map((step, move) => {
        let description;
        if (move > 0) {
            const { row, col } = step.location;
            description = `Go to move #${move} (row: ${row + 1}, col: ${col + 1})`;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                {currentMove === move && move !== 0 ? (
                    <h4>
                        You are at move #{move} (row: {step.location.row + 1}, col: {step.location.col + 1})
                    </h4>
                ) : (
                    <button onClick={() => jumpTo(move)}>{description}</button>
                )}
            </li>
        );
    });
    const orderedMoves = sortAscending ? moves : [...moves].reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={toggleSortOrder}>{sortAscending ? 'Descending' : 'Ascending'}</button>
                <ol>{orderedMoves}</ol>
            </div>
        </div>
    );
}

export default Game;
