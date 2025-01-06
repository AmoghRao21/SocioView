import { Route, Routes } from "react-router-dom"
import FeaturesPage from "./Pages/FeaturesPage"
import OverviewPage from "./Pages/OverviewPage"
import TeamPage from "./Pages/TeamPage"
import Sidebar from "./components/Sidebar"
import HomePage from "./Pages/HomePage"
import ChatClient from "./Pages/ChatPage"

function App(){ 

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflo-hidden">
      

      {/*BG*/}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-10"/>
        <div className="absolute inset-0"/>

      </div>
      <Sidebar />
      <Routes>
        <Route path="/chat" element={<ChatClient />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/overview' element={<OverviewPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </div>
  )
}

export default App
