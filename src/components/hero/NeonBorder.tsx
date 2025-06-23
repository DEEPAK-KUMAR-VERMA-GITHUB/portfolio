import { motion } from "framer-motion"

const NeonBorder = ({ children, className = "", glowColor = "cyan" }: { 
    children: React.ReactNode, 
    className?: string,
    glowColor?: string 
  }) => {
    return (
      <motion.div
        className={`relative ${className}`}
        whileHover={{
          boxShadow: `0 0 20px ${glowColor === 'cyan' ? '#00ffff' : glowColor === 'purple' ? '#8b5cf6' : '#ff00ff'}40`,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${
          glowColor === 'cyan' ? 'from-cyan-400/20 via-transparent to-purple-400/20' :
          glowColor === 'purple' ? 'from-purple-400/20 via-transparent to-pink-400/20' :
          'from-pink-400/20 via-transparent to-cyan-400/20'
        } rounded-lg blur-sm`} />
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg">
          {children}
        </div>
      </motion.div>
    )
  }

export default NeonBorder