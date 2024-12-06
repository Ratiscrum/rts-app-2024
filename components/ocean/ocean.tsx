import './ocean.scss';

export default function OceanBackground() {
  return (
    <div className="ocean-container">
      <div className="whaleContainer">
        {Array.from({ length: 4 }, (_, i) => {
          const x = i + 1;
          return (
            <div key={x} className={`whalePos size${x}`}>
              <div className={`whaleRotate size${x}`}>
                <div className="whale"></div>
                <div className="fin"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cPos">
        <div className="cc">
          <div className="circle one"></div>
          <div className="circle two"></div>
          <div className="circle three"></div>
          <div className="circle four"></div>
        </div>
      </div>
      <div className="cPos cPosTriangle">
        <div className="triangleContainer">
          <div className="triangleBar"></div>
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} className="triangle"></span>
          ))}
        </div>
      </div>

      <div className="gradientContainer">
        <div className="ocean-overlay one"></div>
        <div className="gradient">
          {Array.from({ length: 300 }, (_, i) => (
            <span key={`ray1-${i}`} className={`ray${i + 1}`}></span>
          ))}
          {/*{Array.from({length: 300}, (_, i) => (*/}
          {/*    <span key={`ray2-${i}`} className={`ray${i + 1}`}></span>*/}
          {/*))}*/}
        </div>
      </div>
      <div className="rocks">
        <div className="rock one"></div>
        <div className="rock two"></div>
        <div className="rock three"></div>
        <div className="rock four"></div>
        <div className="rock five"></div>
        <div className="rock six"></div>
        <div className="rock seven"></div>
        <div className="rock eight"></div>
        <div className="rock nine"></div>
        <div className="rock ten"></div>
      </div>
      <div className="bubbleContainer">
        {Array.from({ length: 100 }, (_, i) => {
          const x = i + 1;
          return (
            <span key={x} className={`bubbleY${x}`}>
              <span className={`bubbleX${x}`}></span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
