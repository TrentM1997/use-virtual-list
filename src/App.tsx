import './App.css'
import RenderScrollers from './components/containers/RenderScrollers'

function App() {


  return (
    <section style={{ height: '1000px', width: '100%' }}>
      <h1>Virtualized Rendering of large lists</h1>

      <RenderScrollers />

    </section>
  )
}

export default App
