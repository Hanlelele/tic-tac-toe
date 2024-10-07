import Square from '../square';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winningSquares: [a, b, c] };
        }
    }
    return { winner: null, winningSquares: [] };
}

function Board({ xIsNext, squares, onPlay }) {
    const handleClick = (i) => {
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares, i);
    };

    const { winner, winningSquares } = calculateWinner(squares);
    const isDraw = squares.every(Boolean) && !winner;

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (isDraw) {
        status = "It's a draw!";
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const boardSize = 3;
    const boardRows = [];

    for (let row = 0; row < boardSize; row++) {
        const squaresInRow = [];

        for (let col = 0; col < boardSize; col++) {
            const index = row * boardSize + col;
            const isWinningSquare = winningSquares.includes(index);
            squaresInRow.push(
                <Square
                    key={index}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                    isWinning={isWinningSquare}
                />,
            );
        }

        boardRows.push(
            <div className="board-row" key={row}>
                {squaresInRow}
            </div>,
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}

export default Board;
