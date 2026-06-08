import { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/work-sans/300.css'
import '@fontsource/work-sans/400.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/600.css'
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
  const [isLight, setIsLight] = useState(() => window.__theme.isLight())
  const toggleTheme = () => setIsLight(window.__theme.toggle())

  return (
    <div className="container">
      <header>
        <div className="theme-toggle-wrapper">
          <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode">
            <i className={isLight ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
        <div className="header-photo">
          <img
            src="https://www.gravatar.com/avatar/005638b36f6a30900c959ef6091c33337fbcc63f735aa76c86b27fdade7bf510?s=200"
            alt="Pulkit Sinha"
            className="profile-photo"
          />
        </div>
        <div className="header-content">
          <h1>Pulkit Sinha</h1>
          <p className="subtitle">Software Engineer / Part-Time AI Babysitter</p>
          <div className="social-links">
            <a href="https://github.com/itsapinhulk" target="_blank" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/pulkitsinha" target="_blank" title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.goodreads.com/itsapinhulk" target="_blank" title="Goodreads">
              <i className="fab fa-goodreads-g"></i>
            </a>
            <a href="https://steamcommunity.com/id/itsapinhulk" target="_blank" title="Steam">
              <i className="fab fa-steam"></i>
            </a>
            <a href="https://www.truetrophies.com/gamer/itsapinhulky" target="_blank" title="PlayStation">
              <i className="fab fa-playstation"></i>
            </a>
            <a href="https://www.trueachievements.com/gamer/itsapinhulk" target="_blank" title="Xbox">
              <i className="fab fa-xbox"></i>
            </a>
          </div>
        </div>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I'm a passionate software engineer with hands-on expertise in building scalable and
            performant systems. I've worked in a variety of domains - Full-Stack Websites,
            Search/Ads Serving, High-Throughput Data Pipelines and Quantitative Research Systems.
          </p>
          <p style={{ marginTop: '1rem' }}>
            When I'm not coding for work or for pleasure, you'll find me playing video games,
            reading books, watching movies, occasionally running and swimming. My last big run
            was the{' '}
            <a href="https://www.goldengatehalf.com/" target="_blank">
              Golden Gate Half-Marathon
            </a>
            {' '}and I love to travel.
          </p>
        </div>
      </section>

      <section id="projects-link">
        <h2>Projects</h2>
        <a
          href={import.meta.env.VITE_PROJECTS_URL}
          className="experience-item"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <div className="experience-info">
            <h3>See my personal projects →</h3>
          </div>
        </a>
      </section>

      <section id="experience">
        <h2>Work Experience</h2>

        <div className="experience-item">
          <div className="experience-header">
            <div className="experience-info">
              <a href="https://www.aprioriinvestments.com/" target="_blank">
                <p className="company">A Priori Investments</p>
              </a>
              <h3>Senior Software Engineer</h3>
              <span className="duration">Dec 2024 - Current</span>
            </div>
          </div>
          <div className="experience-description">
            Working on internal quantitative research and trading systems.
            <br /><br />
            GitHub work profile:{' '}
            <a href="https://github.com/pulkit-apriori" target="_blank">pulkit-apriori</a>
            <div className="project-tags">
              <span className="tag">C++</span>
              <span className="tag">Python</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">CMake</span>
              <span className="tag">Prometheus</span>
            </div>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-header">
            <div className="experience-info">
              <a href="https://www.google.com" target="_blank">
                <p className="company">Google</p>
              </a>
              <h3>Senior Software Engineer</h3>
              <span className="duration">2021 - Dec 2024</span>
            </div>
          </div>
          <div className="experience-description">
            <ul>
              <li>
                Full-stack engineer in{' '}
                <a href="https://support.google.com/google-ads/answer/3246303?hl=en" target="_blank">
                  Local Search Ads
                </a>
                {' '}- responsible for the development and launch of multiple location focused Ad
                Formats, including those featuring video assets.
              </li>
              <li>
                Worked with Core Python team to automate clean up of Python code in Google's
                monorepo.
              </li>
              <li>
                Previously, part of the Cluster Planning Team, responsible for software managing
                server installation inside Google's DataCenters.
              </li>
            </ul>
          </div>
          <div className="project-tags">
            <span className="tag">C++</span>
            <span className="tag">Python</span>
            <span className="tag">Java</span>
            <span className="tag">SQL</span>
            <span className="tag">TypeScript</span>
            <span className="tag">Angular</span>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-header">
            <div className="experience-info">
              <a href="https://www.worldquant.com" target="_blank">
                <p className="company">WorldQuant</p>
              </a>
              <h3>Vice President, Software Development</h3>
              <span className="duration">2010 - 2021</span>
            </div>
          </div>
          <div className="experience-description">
            <ul>
              <li>
                Tech Lead for the{' '}
                <a href="https://platform.worldquantbrain.com/" target="_blank">WebSim / WQBrain</a> project.
              </li>
              <li>
                Created an expression-based language for authoring trading models, including modern
                features such as type inference, unit conversion, structs and higher-order functions.
              </li>
              <li>
                Set up Nix based dependency tracking and build system, and CMake/Python based SDK
                for internal users of research system.
              </li>
              <li>Set up Kubernetes/Docker based CI/CD system for internal projects.</li>
              <li>
                Previously, worked as Quantitative Researcher developing trading algorithms for
                global equity and futures markets.
              </li>
            </ul>
          </div>
          <div className="project-tags">
            <span className="tag">C++</span>
            <span className="tag">Python</span>
            <span className="tag">SQL</span>
            <span className="tag">Nix</span>
            <span className="tag">CMake</span>
            <span className="tag">Docker</span>
            <span className="tag">TypeScript</span>
            <span className="tag">React</span>
          </div>
        </div>
      </section>

      <section id="education">
        <h2>Education</h2>

        <div className="education-item">
          <div className="education-header">
            <div className="education-info">
              <a href="https://www.stanford.edu/" target="_blank">
                <h3>Stanford University</h3>
              </a>
              <span className="location">Palo Alto, CA</span>
              <p className="degree">Selected courses in Computer Graphics and Machine Learning</p>
              <span className="duration">2022 - 2023</span>
            </div>
          </div>
        </div>

        <div className="education-item">
          <div className="education-header">
            <div className="education-info">
              <a href="https://www.iitb.ac.in/" target="_blank">
                <h3>Indian Institute of Technology, Bombay</h3>
              </a>
              <span className="location">Mumbai, India</span>
              <p className="degree">Bachelor of Technology in Computer Science and Engineering</p>
              <span className="duration">2006 - 2010</span>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Languages</h3>
            <div className="skill-list">
              {['C++', 'Python', 'Go', 'JavaScript', 'TypeScript', 'Shell', 'SQL', 'HTML/CSS',
                'Java', 'Nix', 'Ruby', 'MATLAB', 'Lua'].map(s => (
                <span key={s} className="skill-item">{s}</span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3>Frameworks & Libraries</h3>
            <div className="skill-list">
              {['React', 'Node.js', 'Django', 'Flask', 'Angular', 'Numpy', 'Scipy', 'Pandas',
                'Polars', 'Eigen', 'PyTorch', 'JSON', 'Protocol Buffers'].map(s => (
                <span key={s} className="skill-item">{s}</span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3>Tools & Technologies</h3>
            <div className="skill-list">
              {['Git', 'Jujutsu / jj VCS', 'Bash', 'tmux', 'Docker', 'k8s', 'MySQL', 'PostgreSQL', 'AWS',
                'NoSQL', 'CMake', 'Conda', 'Nixpkgs', 'Nginx', 'Redis', 'Prometheus', 'Grafana',
                'NeoVIM', 'JetBrains', 'Zed'].map(s => (
                <span key={s} className="skill-item">{s}</span>
              ))}
            </div>
          </div>

          <div className="skill-category full-width">
            <h3>Concepts</h3>
            <div className="skill-list">
              {['RESTful APIs', 'Full-Stack', 'Microservices', 'CI/CD', 'DevOps', 'Build Systems',
                'Databases', 'TDD', 'HPC', 'Machine Learning / AI', 'Compilers/Interpreters',
                'Data Pipelines', 'Graphics'].map(s => (
                <span key={s} className="skill-item">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

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
