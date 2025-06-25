type ScoreComponent = {
  score: number;
  onUpvote: () => void;
  onDownvote: () => void;
};

function ScoreComponent({ score, onUpvote, onDownvote }: ScoreComponentProps) {
  return (
    <div className="score-component flex gap-1">
      <button onClick={onUpvote}>
        <div className="icon-img">
          <p>++</p>
        </div>
      </button>

      <span>{score}</span>

      <button onClick={onDownvote}>
        <div className="icon-img">
          <p>➖</p>
        </div>
      </button>
    </div>
  );
}

export default ScoreComponent;
