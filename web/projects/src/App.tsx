import './App.css'

function formatBuildTime(ms: string): string {
  const d = new Date(Number(ms))
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const day = String(d.getUTCDate()).padStart(2, '0')
  const mon = months[d.getUTCMonth()]
  const year = d.getUTCFullYear()
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return `${day} ${mon} ${year}, ${hh}:${mm} UTC`
}

export default function App() {
  return (
    <div className="container">
      <header>
        <a href={import.meta.env.VITE_HOME_URL} className="back">← pulkitsinha.com</a>
        <h1>Projects</h1>
      </header>

      <main>
        <div className="project-grid">
          <div className="project-card">
            <h3>
              <a href="/us-green-card-wait-time/" target="_blank">US Green Card Tracker</a>
            </h3>
            <p>
              An auto-updating website showing historical and current priority dates for all
              categories of US Green Card applications.
            </p>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">Python</span>
            </div>
          </div>

          <div className="project-card">
            <h3>
              <a href="https://github.com/itsapinhulk/dotfiles" target="_blank">dotfiles</a>
              {' / '}
              <a href="https://github.com/itsapinhulk/shellutils" target="_blank">shellutils</a>
            </h3>
            <p>
              A collection of useful utility functions and configuration settings for tools in
              my day-to-day work.
            </p>
            <div className="project-tags">
              <span className="tag">Shell</span>
              <span className="tag">Python</span>
              <span className="tag">Config</span>
            </div>
          </div>

          <div className="project-group">
            <div className="project-card gist-card">
              <h3>
                <a href="https://gist.github.com/itsapinhulk" target="_blank">
                  Useful code snippets
                </a>
              </h3>
            </div>
            <div className="coming-soon">More to come ...</div>
          </div>
        </div>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Pulkit Sinha. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.7 }}>
          Built with <a href="https://claude.ai" target="_blank">Claude AI</a>,{' '}
          <a target="_blank" href="https://icons8.com/icon/hpvYvQwrrjRL/p">P</a> favicon by{' '}
          <a target="_blank" href="https://icons8.com">Icons8</a>
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
          Last Updated: {formatBuildTime(__BUILD_TIME__)}
        </p>
      </footer>
    </div>
  )
}
