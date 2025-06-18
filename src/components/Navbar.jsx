import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const SESSION_TIMEOUT_SECONDS = 10;

function Navbar() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_TIMEOUT_SECONDS);
  const [isAway, setIsAway] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef(null);

  const resetTimer = () => {
    setSecondsLeft(SESSION_TIMEOUT_SECONDS);
    setIsAway(false);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);

  useEffect(() => {
    if (isAway) return;
    if (secondsLeft <= 0) {
      setIsAway(true);
      return;
    }
    timerRef.current = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timerRef.current);
  }, [secondsLeft, isAway]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <nav className={`navbar navbar-expand-lg modern-navbar ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="container-fluid modern-navbar-container">
        <a className="navbar-brand modern-navbar-brand" href="/">
          <span className="brand-gradient">DevbyDeez</span>
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                <li><a className="dropdown-item" href="#">Product 1</a></li>
                <li><a className="dropdown-item" href="#">Product 2</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>

          <div className="modern-navbar-user ms-lg-3 d-flex align-items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="btn btn-sm theme-toggle-btn">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="modern-navbar-avatar">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User Avatar" 
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="modern-navbar-info d-none d-lg-block">
              <div className="modern-navbar-account">
                <strong>Account</strong>
                <span className={`status-badge ${isAway ? 'away' : 'active'} ms-2`}>
                  {isAway ? 'Away' : 'Active'}
                </span>
              </div>
              <small className="timeout-text d-block">
                {isAway ? 'Timeout reached' : `Timeout in: ${formatTime(secondsLeft)}`}
              </small>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
