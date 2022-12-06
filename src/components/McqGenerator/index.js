import './index.css'

const McqGenerator = props => {
  const {mcqData, saveOption} = props
  const {id, question, options} = mcqData
  const {a, b, c, d} = options

  function change(event) {
    const {value} = event.target
    saveOption(id, value)
  }

  return (
    <li className="list-item">
      <h3>{question}</h3>
      <div>
        <input
          id={`${id}${a}`}
          type="radio"
          name={id}
          value={a}
          onChange={change}
        />
        <label htmlFor={`${id}${a}`}>{a}</label>
      </div>
      <div>
        <input
          id={`${id}${b}`}
          type="radio"
          name={id}
          value={b}
          onChange={change}
        />
        <label htmlFor={`${id}${b}`}>{b}</label>
      </div>
      <div>
        <input
          id={`${id}${c}`}
          type="radio"
          name={id}
          value={c}
          onChange={change}
        />
        <label htmlFor={`${id}${c}`}>{c}</label>
      </div>
      <div>
        <input
          id={`${id}${d}`}
          type="radio"
          name={id}
          value={d}
          onChange={change}
        />
        <label htmlFor={`${id}${d}`}>{d}</label>
      </div>
    </li>
  )
}

export default McqGenerator
