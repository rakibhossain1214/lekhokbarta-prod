import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { motion } from 'framer-motion'

export default function AppLayout({ children }) {
  const router = useRouter()
  const variants = {
    out: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.75,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  }

  if (router.pathname !== '/login') {
    return (
      <motion.main
        initial="out"
        animate="in"
        exit="out"
        variants={variants}
        transition={{ type: 'linear' }}
        key={router.pathname}
      >
        {children}
      </motion.main>
    )
  } else {
    return (
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
        key={router.pathname}
      >
        {children}
      </motion.main>
    )
  }
}
