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
        <h1>Pulkit Sinha</h1>
      </header>

      <main>
        <section>
          <h2>Coming Soon</h2>
          <p>
            This is a placeholder for <strong>{import.meta.env.VITE_HOME_URL}</strong>.
            Full content is being migrated here.
          </p>
          <ul>
            <li><a href={import.meta.env.VITE_PROJECTS_URL}>{import.meta.env.VITE_PROJECTS_URL}</a></li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Pulkit Sinha</p>
        <p className="build-time">Last updated: {formatBuildTime(__BUILD_TIME__)}</p>
      </footer>
    </div>
  )
}
