import './App.css'
import EndlessScroll from './components/EndlessScroll'

function App() {

  return (
    <section style={{ height: '1000px', width: '100%' }}>
      <h1>Virtuoso endless scroll</h1>
      <h2>custom useHook implementation</h2>
      <div
        style={{ height: '500px', width: '400px', border: '1px', borderStyle: 'solid', margin: 'auto' }}
      >
        <EndlessScroll />
      </div>
      <p className="prompt">
        scroll to render more list items
      </p>
    </section>
  )
}

export default App
