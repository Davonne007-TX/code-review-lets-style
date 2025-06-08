function ScoreComponent(props: { score: number }) {
  return (
    <div className="score-component flex gap-1">
      <button>
        <div className="icon-img">
          <p>➕</p>
        </div>
      </button>

      <span>{props.score}</span>

      <button>
        <div className="icon-img">
          <p>➖</p>
        </div>
      </button>
    </div>
  );
}

export default ScoreComponent;
