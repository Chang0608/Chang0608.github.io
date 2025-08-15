import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useDynamicBackground } from '../hooks/useDynamicBackground'
import { useEffect, useState } from 'react'
import LogCard from '../components/LogCard'

// 題目資料結構
interface Problem {
  title: string
  description: string
  tags: string[]
}

export default function ProjectShowroomLayout() {
  const { backgroundElement } = useDynamicBackground()
  const { projectName } = useParams()
  const navigate = useNavigate()

  const [problems, setProblems] = useState<Problem[]>([])
  const [page, setPage] = useState(0)
  const pageSize = 9
  const totalPages = Math.ceil(problems.length / pageSize)

  // 抓取 big_solutions.md 並解析
  useEffect(() => {
    fetch('/big_solutions.md') // 放在 public 資料夾
      .then(res => res.text())
      .then(text => {
        const items: Problem[] = []
        const regex = /^##\s+(.*?)\s+\((https?:\/\/[^\s)]+)\)\s*\n([\s\S]*?)(?=^##\s+|\Z)/gm
        let match
        while ((match = regex.exec(text)) !== null) {
          const title = match[1].trim()
          const url = match[2].trim()
          const body = match[3].trim()

          // 取第一行當簡述
          const firstLine = body.split('\n').find(line => line.trim() !== '') || ''
          // 從內文找 tag（假設格式為 [tag1] [tag2]）
          const tags = (body.match(/\[([^\]]+)\]/g) || []).map(t => t.slice(1, -1))

          items.push({
            title,
            description: firstLine,
            tags: tags.length ? tags : ['untagged']
          })
        }
        setProblems(items)
      })
      .catch(err => console.error('讀取 big_solutions.md 失敗', err))
  }, [])

  const startIdx = page * pageSize
  const currentProblems = problems.slice(startIdx, startIdx + pageSize)

  const nextPage = () => setPage(p => (p + 1) % totalPages)
  const prevPage = () => setPage(p => (p - 1 + totalPages) % totalPages)

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">{backgroundElement}</div>

      <motion.div
        layoutId={`project-card-${projectName}`}
        className="absolute inset-0 bg-black/30 rounded-2xl overflow-hidden backdrop-blur-sm"
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="flex h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          {/* 左側分類 */}
          <div className="w-64 bg-[rgba(0,0,0,0.4)] backdrop-blur-md border-r shadow-inner border-white/10 p-4">
            <p className="text-[#bfa382] font-semibold mb-4">Project: {projectName}</p>
            <ul className="space-y-2 text-sm">
              <li className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">分類 1</li>
              <li className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">分類 2</li>
            </ul>
          </div>

          {/* 中間內容 */}
          <div className="flex-1 p-6 overflow-y-auto relative">
            <h1 className="text-3xl font-bold mb-4">{projectName}</h1>

            {/* 箭頭控制 */}
            {problems.length > pageSize && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-white"
                >
                  ←
                </button>
                <button
                  onClick={nextPage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-white"
                >
                  →
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 gap-4"
              >
                {currentProblems.map((p, idx) => (
                  <LogCard
                    key={idx}
                    title={p.title}
                    description={p.description}
                    tags={p.tags}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 右側 AI Panel */}
          <div className="w-80 bg-[rgba(0,0,0,0.35)] backdrop-blur-md shadow-inner border-l border-white/10 p-4">
            <p className="text-gray-400">AI Panel 預留</p>
          </div>
        </motion.div>

        {/* 關閉按鈕 */}
        <motion.button
          onClick={() => navigate('/projects')}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          ✕
        </motion.button>
      </motion.div>
    </div>
  )
}