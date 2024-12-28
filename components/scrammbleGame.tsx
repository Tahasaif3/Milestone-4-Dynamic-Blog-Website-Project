'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Trophy, Timer, Brain } from 'lucide-react'
import confetti from 'canvas-confetti'

const WORD_BANK = [
  'BLOG', 'WRITE', 'STORY', 'CONTENT', 'AUTHOR',
  'ARTICLE', 'CREATIVE', 'PUBLISH', 'EDITOR', 'DRAFT'
]

interface GameState {
  score: number
  timeLeft: number
  currentWord: string
  scrambledWord: string
  gameStatus: 'idle' | 'playing' | 'paused' | 'finished'
  highScore: number
}

export default function WordScrambleGame() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    timeLeft: 60,
    currentWord: '',
    scrambledWord: '',
    gameStatus: 'idle',
    highScore: 0
  })
  const [userInput, setUserInput] = useState('')
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  // Scramble a word randomly
  const scrambleWord = (word: string) => {
    const arr = word.split('')
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.join('')
  }

  // Get a new random word
  const getNewWord = useCallback(() => {
    const word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]
    let scrambled = scrambleWord(word)
    // Make sure scrambled word is different from original
    while (scrambled === word) {
      scrambled = scrambleWord(word)
    }
    return { word, scrambled }
  }, [])

  // Start the game
  const startGame = useCallback(() => {
    const { word, scrambled } = getNewWord()
    setGameState(prev => ({
      ...prev,
      score: 0,
      timeLeft: 60,
      currentWord: word,
      scrambledWord: scrambled,
      gameStatus: 'playing'
    }))
    setUserInput('')
  }, [getNewWord])

  // Handle game timer
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameState.timeLeft > 0) {
      const newTimer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(newTimer)
            return {
              ...prev,
              timeLeft: 0,
              gameStatus: 'finished',
              highScore: Math.max(prev.highScore, prev.score)
            }
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 }
        })
      }, 1000)
      setTimer(newTimer)
      return () => clearInterval(newTimer)
    }
  }, [gameState.gameStatus])

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setUserInput(value)

    if (value === gameState.currentWord) {
      // Trigger confetti on correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      setGameState(prev => ({
        ...prev,
        score: prev.score + 10
      }))
      setUserInput('')
      const { word, scrambled } = getNewWord()
      setGameState(prev => ({
        ...prev,
        currentWord: word,
        scrambledWord: scrambled
      }))
    }
  }

  // Pause game
  const pauseGame = () => {
    if (timer) clearInterval(timer)
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }))
  }

  // Resume game
  const resumeGame = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
  }

  // Reset game
  const resetGame = () => {
    if (timer) clearInterval(timer)
    setGameState(prev => ({
      ...prev,
      score: 0,
      timeLeft: 60,
      currentWord: '',
      scrambledWord: '',
      gameStatus: 'idle'
    }))
    setUserInput('')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            <span>Word Scramble Challenge</span>
          </div>
          <Badge variant="secondary" className="text-lg">
            Score: {gameState.score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-purple-500" />
            <span className="text-sm">Time Left: {gameState.timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">High Score: {gameState.highScore}</span>
          </div>
        </div>

        <Progress value={(gameState.timeLeft / 60) * 100} />

        <AnimatePresence mode="wait">
          {gameState.gameStatus === 'playing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="text-4xl font-bold tracking-wider text-purple-600">
                {gameState.scrambledWord}
              </div>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your answer..."
                className="w-full p-4 text-center text-xl border-2 border-purple-700 rounded-lg focus:border-purple-500 text-gray-900 focus:outline-none"
                autoComplete="off"
                maxLength={gameState.currentWord.length}
              />
            </motion.div>
          )}

          {gameState.gameStatus === 'finished' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <h3 className="text-2xl font-bold">Game Over!</h3>
              <p className="text-xl">Final Score: {gameState.score}</p>
              {gameState.score === gameState.highScore && gameState.score > 0 && (
                <Badge className="bg-yellow-500">New High Score! 🎉</Badge>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-center gap-4">
        {gameState.gameStatus === 'idle' && (
          <Button
            onClick={startGame}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        )}

        {gameState.gameStatus === 'playing' && (
          <Button
            onClick={pauseGame}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-700"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}

        {gameState.gameStatus === 'paused' && (
          <Button
            onClick={resumeGame}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Resume
          </Button>
        )}

        {(gameState.gameStatus === 'paused' || gameState.gameStatus === 'finished') && (
          <Button
            onClick={resetGame}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-800"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

