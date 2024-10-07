function Square({ value, onSquareClick, isWinning }) {
    return (
        <button className={`square ${isWinning ? 'square-winning' : ''}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;
