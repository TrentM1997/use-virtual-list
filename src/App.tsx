import './App.css'
import RenderScrollers from './components/containers/RenderScrollers'

function App() {


  return (
    <section style={{ height: '100%', width: '100%' }}>
      <h1>Custom hook for virtualized rendering</h1>

      <RenderScrollers />

    </section>
  )
}

export default App
