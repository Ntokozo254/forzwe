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

const RESTAURANT_OPTIONS = [
  '🍝 Italian Bistro',
  '🍣 Sushi Bar',
  '🥩 Steakhouse',
  '☕ Cozy Cafe',
  '🌮 Taco Spot',
]

const FOOD_OPTIONS = [
  '🍔 Burger',
  '🍕 Pizza',
  '🍣 Sushi',
  '🍝 Pasta',
  '🥗 Salad',
  '🌮 Tacos',
]

const MAX_HEARTS = 18
const HEART_POOL = Array.from({ length: MAX_HEARTS }).map(() => ({
  left: Math.random() * 100,
  animationDelay: Math.random() * 5,
  animationDuration: 4 + Math.random() * 4,
}))

function HeartsBg({ count }) {
  return (
    <div className="hearts-bg" aria-hidden="true">
      {HEART_POOL.slice(0, count).map((heart, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: `${heart.animationDuration}s`,
          }}
        >
          💗
        </span>
      ))}
    </div>
  )
}

function Questionnaire() {
  const [step, setStep] = useState('ask')
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState({ top: 0, left: 0 })
  const [restaurant, setRestaurant] = useState(null)
  const [food, setFood] = useState(null)

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

  if (step === 'done') {
    return (
      <div className="questionnaire-page">
        <HeartsBg count={18} />
        <div className="q-card celebrate">
          <div className="big-emoji">🥳💖</div>
          <h1>It's a date!</h1>
          <p>
            {restaurant} for some {food.toLowerCase()} 🥰 Can't wait!
          </p>
        </div>
      </div>
    )
  }

  if (step === 'food') {
    return (
      <div className="questionnaire-page">
        <HeartsBg count={12} />
        <div className="q-card">
          <div className="big-emoji">🍽️</div>
          <h1>What should we eat?</h1>
          <p className="subtitle">Pick something yummy</p>

          <div className="option-grid">
            {FOOD_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className="btn btn-option"
                onClick={() => {
                  setFood(option)
                  setStep('done')
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === 'restaurant') {
    return (
      <div className="questionnaire-page">
        <HeartsBg count={12} />
        <div className="q-card">
          <div className="big-emoji">📍</div>
          <h1>Where should we go?</h1>
          <p className="subtitle">Pick a spot for our date</p>

          <div className="option-grid">
            {RESTAURANT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className="btn btn-option"
                onClick={() => {
                  setRestaurant(option)
                  setStep('food')
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="questionnaire-page">
      <HeartsBg count={12} />

      <div className="q-card">
        <div className="big-emoji">🐻💌</div>
        <h1>Will you go on a date with me?</h1>
        <p className="subtitle">Choose wisely...</p>

        <div className="btn-row">
          <button
            type="button"
            className="btn btn-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={() => setStep('restaurant')}
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
