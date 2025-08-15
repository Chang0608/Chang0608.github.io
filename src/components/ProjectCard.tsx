import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MiniProgressBar from '../components/MiniProgressBar'

const ProjectCard = ({ name, title, description, tags, repo, progress }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      layoutId={`project-card-${name}`}
      onClick={() => navigate(`/projects/${name}`)}
      className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4 cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {progress && <MiniProgressBar solved={progress.solved} total={progress.total} />}
      </div>
      <p className="text-sm text-gray-300">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs text-[#bfa382]">
        {tags.map((tag, i) => (
          <span key={i} className="bg-white/10 px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <div className="pt-3 flex gap-4" onClick={(e) => e.stopPropagation()}>
        {repo && (
          <a href={repo} target="_blank" rel="noreferrer" className="text-white hover:underline text-sm">
            💾 GitHub
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard
