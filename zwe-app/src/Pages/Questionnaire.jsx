import { useState } from 'react'
import './CSS/Questionnaire.css'

const NO_MESSAGES = [
  'No',
  'Are you sure?',
  'Really sure?',
  'Think again!',
  "Last chance...",
  "You'll regret this!",
  "Pretty please?",
  "Don't be like that :(",
  'Okay fine, one more try?',
  "This is your final answer?",
]

function Questionnaire() {
  const [accepted, setAccepted] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState({ top: 0, left: 0 })

  const yesScale = 1 + noCount * 0.15
  const noScale = Math.max(1 - noCount * 0.08, 0.4)
  const noLabel = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]

  const dodgeNo = () => {
    const maxTop = 200
    const maxLeft = 260
    const top = Math.random() * maxTop - maxTop / 2
    const left = Math.random() * maxLeft - maxLeft / 2
    setNoPos({ top, left })
    setNoCount((c) => c + 1)
  }

  if (accepted) {
    return (
      <div className="questionnaire-page">
        <div className="hearts-bg" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            >
              💕
            </span>
          ))}
        </div>
        <div className="q-card celebrate">
          <div className="big-emoji">🥳💖</div>
          <h1>Yay! She said yes!</h1>
          <p>I knew you'd say yes 🥰 I love you so much!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="questionnaire-page">
      <div className="hearts-bg" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            💗
          </span>
        ))}
      </div>

      <div className="q-card">
        <div className="big-emoji">🐻💌</div>
        <h1>Will you be my girlfriend?</h1>
        <p className="subtitle">Choose wisely...</p>

        <div className="btn-row">
          <button
            type="button"
            className="btn btn-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={() => setAccepted(true)}
          >
            Yes 💖
          </button>

          <button
            type="button"
            className="btn btn-no"
            style={{
              transform: `translate(${noPos.left}px, ${noPos.top}px) scale(${noScale})`,
            }}
            onMouseEnter={dodgeNo}
            onClick={dodgeNo}
          >
            {noLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
