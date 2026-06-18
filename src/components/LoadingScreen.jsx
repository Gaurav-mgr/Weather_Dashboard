import './LoadingScreen.css';

export default function LoadingScreen({ isExiting = false }) {
  return (
    <div className={`loading-screen${isExiting ? ' is-exiting' : ''}`}>
      <div className="loading-panel">
        <div className="loading-orbit" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="loading-kicker">Live forecast studio</p>
        <h1 className="loading-title">Weather Analytics</h1>
        <div className="loading-progress" aria-hidden="true">
          <span></span>
        </div>
      </div>
    </div>
  );
}
