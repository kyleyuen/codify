import { useEffect, useState, useRef } from 'react'
import { Link /*, useNavigate */ } from 'react-router-dom'
import "../styles/ProjectsPage.css"

// --- REVEAL ON SCROLL HOOK (IntersectionObserver) ---
function useInViewOnce(options = { threshold: 0.15, rootMargin: "0px" }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.unobserve(entry.target) // reveal only once
      }
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, options])

  return [ref, inView]
}

// --- CARD ---
function ProjectCard({ project, index }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.15 })
  return (
    <div
      ref={ref}
      className={`project-card ${inView ? 'reveal' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }} // subtle stagger
    >
      <div className="window-chrome">
        <div className="dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="filename">project-{project.id}.md</span>
      </div>

      <div className="card-body">
        <h3>{project.title}</h3>
        <div className="card-meta">Updated: {project.updatedAt}</div>
        <p>{project.description}</p>

        <div style={{ marginTop: "0.75rem" }}>
          <button
            className="ghost-btn"
            onClick={() => console.log(`Open ${project.title}`)}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  // Header Title Text
  const title = "Projects — Build while you learn"

  // Typewriter effect for title
  const [typed, setTyped] = useState("")
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setTyped(title.slice(0, i + 1))
      i++
      if (i === title.length) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [title])

  // Dummy data (5 projects)
  const demoProjects = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    description: "A placeholder project. We’ll turn this into a guided path.",
    updatedAt: "Just now",
  }))

  // const navigate = useNavigate()

  return (
    <div className="projects-root bg-landing">
      {/* Hero / header */}
      <header className="projects-header">
        <h1 className="type-title">
          {typed}
          <span className="caret">|</span>
        </h1>

        <p className="subtitle">
          Spin up a new idea. We’ll guide you step-by-step with a path tailored to your project.
        </p>

        <div className="actions">
          <button
            className="primary-btn"
            onClick={() => console.log('Start New Project clicked')}
          >
            Start a new project
          </button>

          <Link className="link-btn" to="/">Back to Home</Link>
        </div>
      </header>

      {/* Your current projects */}
      <section className="projects-section">
        <h2 className="section-title">Your current projects:</h2>

        <div className="projects-grid">
          {demoProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
