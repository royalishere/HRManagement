import {routes} from "./routes/index.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from "./contexts/AuthContext.jsx";

function App() {

  const routeComponents = routes.map(({path, element}, key) => <Route path={path} element={element} key={key}/>);
  return (
     <>
         <AuthProvider>
             <BrowserRouter>
                <Routes>
                    {routeComponents}
                </Routes>
             </BrowserRouter>
         </AuthProvider>
     </>
  )
}

export default App
