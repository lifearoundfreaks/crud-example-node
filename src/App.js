import { LoggedUser, SiteRoutes } from "./components"
import './App.css'

const App = () => {
    return (
        <div className="App">
            <LoggedUser />
            <SiteRoutes />
        </div>
    )
}

export default App
