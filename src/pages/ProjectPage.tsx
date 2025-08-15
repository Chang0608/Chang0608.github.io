import React from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

const projects = [
  {
    name: 'chatroom',
    title: 'Chatroom 系統',
    description: '支援登入、私聊、GIF 傳送與群組管理的聊天室，採用 Firebase 與 React 技術實作。',
    tags: ['React', 'Firebase', 'Tailwind'],
    link: '/projects/chatroom',
    repo: 'https://github.com/chang0608/chatroom',
    progress: { solved: 95, total: 100 },
  },
  {
    name: 'cses-marathon',
    title: 'CSES Marathon',
    description: '紀錄 CSES 題解與程式碼，附有筆記與程式碼解說。',
    tags: ['C++', 'Algorithm', 'Competitive'],
    link: '/projects/cses-marathon',
    repo: 'https://github.com/chang0608/cses-marathon',
    progress: { solved: 0, total: 100 },
  },
  {
    name: 'hpc-practice-log',
    title: 'HPC 練習記錄',
    description: '整理 MPI、CUDA、OpenACC 等高效能計算實驗與心得，卡片式展示。',
    tags: ['MPI', 'CUDA', 'OpenACC'],
    link: '/projects/hpc-practice-log',
    repo: 'https://github.com/chang0608/hpc-practice-log',
    progress: { solved: 5, total: 100 },
  },
]

export default function ProjectsPage() {
  const { backgroundElement } = useDynamicBackground()

  return (
    <motion.div
      className="relative min-h-screen w-full px-4 py-12 bg-black text-white font-zen overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      {backgroundElement}
      <div className="z-10 relative max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#f9f6f1]">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
