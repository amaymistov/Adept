import './App.css'
import {Route, Routes} from "react-router-dom";
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage";
import Layout from "./shared/layouts/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<CompaniesPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
