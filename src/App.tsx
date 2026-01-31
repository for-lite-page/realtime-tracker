import './App.css'
import {Counter} from './counter'

import { StoreProvider } from "./store/StoreContext";

function App() {
  return (
      <StoreProvider>
        <Counter/>
      </StoreProvider>
  )
}

export default App
