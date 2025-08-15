import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './config'
import { AnimatePresence } from 'framer-motion'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ChatroomPage from './pages/ChatroomPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectPage'
import ProjectShowroomLayout from './pages/ProjectShowroomLayout'
import HPCPage from './pages/HPCPage'
import NavBar from './components/NavBar'
import NotesIndex from './notes/index'
import MpiNoteListPage from './notes/mpi'

function AnimatedRoutes({ user }: { user: User | null }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/chat" /> : <LoginPage />} />
        <Route path="/chat" element={user ? <ChatroomPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectName/*" element={<ProjectShowroomLayout />} />

        {/* HPC 舊版 */}
        <Route path="/hpc" element={<HPCPage />} />

        {/* Notes */}
        <Route path="/notes" element={<NotesIndex />} />
        <Route path="/notes/mpi" element={<MpiNoteListPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="text-white flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <Router>
      <NavBar />
      <AnimatedRoutes user={user} />
    </Router>
  )
}

export default App
