import { useState, useEffect } from "react";
import { Trophy, Brain, Zap, Target, Sparkles, CheckCircle2, XCircle, RotateCcw, Star, Rocket, Globe2 } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { PLANETS } from "@/data/planets";

type GameMode = "trivia" | "matching" | "comparison" | "insights";

interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1,
    explanation: "Saturn has 146+ known moons, making it the planet with the most moons in our solar system!",
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correct: 1,
    explanation: "Venus is the hottest planet with surface temperatures of 464°C, even hotter than Mercury which is closer to the Sun!",
  },
  {
    question: "Which planet rotates on its side?",
    options: ["Neptune", "Uranus", "Pluto", "Saturn"],
    correct: 1,
    explanation: "Uranus has an axial tilt of 98 degrees, making it appear to rotate on its side!",
  },
  {
    question: "What is the largest volcano in the solar system?",
    options: ["Mauna Kea (Earth)", "Olympus Mons (Mars)", "Mount Etna (Earth)", "Elysium Mons (Mars)"],
    correct: 1,
    explanation: "Olympus Mons on Mars is the largest volcano in the solar system, standing 21.9 km high!",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Jupiter", "Mars", "Venus", "Saturn"],
    correct: 1,
    explanation: "Mars is called the Red Planet due to iron oxide (rust) in its soil, giving it a reddish appearance.",
  },
  {
    question: "How long is a day on Venus?",
    options: ["24 hours", "59 Earth days", "243 Earth days", "10 hours"],
    correct: 2,
    explanation: "A day on Venus is 243 Earth days - longer than its year! Venus also rotates backward.",
  },
  {
    question: "What is the Great Red Spot?",
    options: ["A volcano on Mars", "A storm on Jupiter", "A crater on the Moon", "An ice cap on Pluto"],
    correct: 1,
    explanation: "The Great Red Spot is a massive storm on Jupiter that has been raging for at least 300 years and is larger than Earth!",
  },
  {
    question: "Which planet has the strongest winds?",
    options: ["Jupiter", "Saturn", "Neptune", "Mars"],
    correct: 2,
    explanation: "Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 km/h!",
  },
];

export default function DataPage() {
  const [gameMode, setGameMode] = useState<GameMode>("insights");
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [matchingPairs, setMatchingPairs] = useState<{ planet: string; fact: string; matched: boolean }[]>([]);
  const [selectedPair, setSelectedPair] = useState<number | null>(null);
  const [comparisonPlanets, setComparisonPlanets] = useState<[typeof PLANETS[0] | null, typeof PLANETS[0] | null]>([null, null]);
  const [comparisonGuess, setComparisonGuess] = useState<"first" | "second" | null>(null);
  const [comparisonScore, setComparisonScore] = useState(0);
  const [comparisonRound, setComparisonRound] = useState(0);

  useEffect(() => {
    if (gameMode === "matching") {
      initializeMatching();
    } else if (gameMode === "comparison") {
      initializeComparison();
    }
  }, [gameMode]);

  const initializeMatching = () => {
    const facts = [
      { planet: "Mercury", fact: "Closest planet to the Sun" },
      { planet: "Venus", fact: "Hottest planet in the solar system" },
      { planet: "Earth", fact: "Only planet known to have life" },
      { planet: "Mars", fact: "Home to Olympus Mons, largest volcano" },
      { planet: "Jupiter", fact: "Largest planet in the solar system" },
      { planet: "Saturn", fact: "Has the most moons (146+)" },
      { planet: "Uranus", fact: "Rotates on its side" },
      { planet: "Neptune", fact: "Strongest winds in solar system" },
    ];
    const shuffled = [...facts].sort(() => Math.random() - 0.5);
    setMatchingPairs(shuffled.map((item) => ({ ...item, matched: false })));
    setSelectedPair(null);
  };

  const initializeComparison = () => {
    const shuffled = [...PLANETS].sort(() => Math.random() - 0.5);
    setComparisonPlanets([shuffled[0], shuffled[1]]);
    setComparisonGuess(null);
  };

  const handleTriviaAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === TRIVIA_QUESTIONS[triviaIndex].correct) {
      setScore(score + 1);
    }
  };

  const nextTriviaQuestion = () => {
    if (triviaIndex < TRIVIA_QUESTIONS.length - 1) {
      setTriviaIndex(triviaIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleMatchingClick = (index: number) => {
    if (matchingPairs[index].matched) return;

    if (selectedPair === null) {
      setSelectedPair(index);
    } else {
      const first = matchingPairs[selectedPair];
      const second = matchingPairs[index];

      // Check if they match
      const planetData = PLANETS.find((p) => p.name === first.planet);
      const matches = planetData && (first.fact.includes(planetData.short.split(".")[0]) || planetData.short.includes(first.fact.split(" ")[0]));

      if (matches && selectedPair !== index) {
        const updated = [...matchingPairs];
        updated[selectedPair].matched = true;
        updated[index].matched = true;
        setMatchingPairs(updated);
        setScore(score + 1);
      }
      setSelectedPair(null);
    }
  };

  const handleComparisonGuess = (guess: "first" | "second") => {
    if (comparisonGuess !== null || !comparisonPlanets[0] || !comparisonPlanets[1]) return;

    setComparisonGuess(guess);
    const firstSize = comparisonPlanets[0].size ?? 0;
    const secondSize = comparisonPlanets[1].size ?? 0;
    const isCorrect = (guess === "first" && firstSize > secondSize) || (guess === "second" && secondSize > firstSize);

    if (isCorrect) {
      setComparisonScore(comparisonScore + 1);
    }

    setTimeout(() => {
      setComparisonRound(comparisonRound + 1);
      initializeComparison();
    }, 2000);
  };

  const resetGame = () => {
    setTriviaIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setComparisonRound(0);
    setComparisonScore(0);
    initializeMatching();
    initializeComparison();
  };

  const currentQuestion = TRIVIA_QUESTIONS[triviaIndex];
  const allMatched = matchingPairs.length > 0 && matchingPairs.every((p) => p.matched);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-fuchsia-500/10" />
        <div className="container relative z-10 mx-auto px-6">
          <Reveal>
            <div className="text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                <Brain className="mr-2 h-3 w-3" />
                Interactive Learning
              </span>
              <h1 className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
                Space Explorer Academy
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
                Test your knowledge, challenge your skills, and discover amazing space facts through interactive games and activities!
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Game Mode Selector */}
      <section className="border-b border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setGameMode("insights")}
              className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition ${
                gameMode === "insights"
                  ? "border-indigo-500 bg-indigo-500/20 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Space Insights
            </button>
            <button
              onClick={() => setGameMode("trivia")}
              className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition ${
                gameMode === "trivia"
                  ? "border-indigo-500 bg-indigo-500/20 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <Brain className="h-4 w-4" />
              Trivia Quiz
            </button>
            <button
              onClick={() => setGameMode("matching")}
              className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition ${
                gameMode === "matching"
                  ? "border-indigo-500 bg-indigo-500/20 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <Target className="h-4 w-4" />
              Planet Matching
            </button>
            <button
              onClick={() => setGameMode("comparison")}
              className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition ${
                gameMode === "comparison"
                  ? "border-indigo-500 bg-indigo-500/20 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <Zap className="h-4 w-4" />
              Size Challenge
            </button>
          </div>
        </div>
      </section>

      {/* Game Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {gameMode === "insights" && (
            <Reveal>
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Mind-Blowing Space Facts</h2>
                  <p className="text-white/60">Discover incredible insights about our solar system and beyond</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      icon: <Rocket className="h-6 w-6" />,
                      title: "Speed of Light",
                      fact: "Light travels at 299,792,458 m/s. It takes 8 minutes and 20 seconds for sunlight to reach Earth!",
                      color: "from-yellow-500/20 to-orange-500/20",
                    },
                    {
                      icon: <Globe2 className="h-6 w-6" />,
                      title: "Earth's Age",
                      fact: "Earth is approximately 4.54 billion years old. Life appeared about 3.7 billion years ago!",
                      color: "from-blue-500/20 to-cyan-500/20",
                    },
                    {
                      icon: <Star className="h-6 w-6" />,
                      title: "The Sun",
                      fact: "The Sun contains 99.86% of the solar system's mass. It could fit 1.3 million Earths inside!",
                      color: "from-orange-500/20 to-red-500/20",
                    },
                    {
                      icon: <Sparkles className="h-6 w-6" />,
                      title: "Black Holes",
                      fact: "A black hole's gravity is so strong that not even light can escape. The nearest one is 1,500 light-years away!",
                      color: "from-purple-500/20 to-pink-500/20",
                    },
                    {
                      icon: <Trophy className="h-6 w-6" />,
                      title: "Jupiter's Protection",
                      fact: "Jupiter acts as a cosmic shield, deflecting asteroids and comets away from inner planets with its massive gravity!",
                      color: "from-indigo-500/20 to-violet-500/20",
                    },
                    {
                      icon: <Zap className="h-6 w-6" />,
                      title: "Neptune's Winds",
                      fact: "Neptune has supersonic winds reaching 2,100 km/h - nearly 9 times faster than the strongest hurricanes on Earth!",
                      color: "from-cyan-500/20 to-blue-500/20",
                    },
                  ].map((insight, i) => (
                    <Reveal key={i} delay={i * 50}>
                      <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${insight.color} p-6 backdrop-blur`}>
                        <div className="flex items-start gap-4">
                          <div className="rounded-lg bg-white/10 p-3 text-white">{insight.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                            <p className="text-white/80 leading-relaxed">{insight.fact}</p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {gameMode === "trivia" && (
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Space Trivia Quiz</h2>
                    <p className="text-white/60 mt-1">
                      Question {triviaIndex + 1} of {TRIVIA_QUESTIONS.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">
                      {score}/{triviaIndex + 1}
                    </div>
                    <p className="text-sm text-white/60">Score</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6">{currentQuestion.question}</h3>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentQuestion.correct;
                      const showResult = selectedAnswer !== null;

                      return (
                        <button
                          key={index}
                          onClick={() => handleTriviaAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full rounded-xl border p-4 text-left transition ${
                            showResult
                              ? isCorrect
                                ? "border-green-500 bg-green-500/20 text-white"
                                : isSelected
                                  ? "border-red-500 bg-red-500/20 text-white"
                                  : "border-white/10 bg-white/5 text-white/60"
                              : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400" />}
                            <span>{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showExplanation && (
                  <div className="mb-6 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                    <p className="text-white/90 leading-relaxed">
                      <strong className="text-indigo-300">Explanation:</strong> {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  {triviaIndex < TRIVIA_QUESTIONS.length - 1 ? (
                    <button
                      onClick={nextTriviaQuestion}
                      disabled={!showExplanation}
                      className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={resetGame}
                      className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-fuchsia-500"
                    >
                      Play Again
                    </button>
                  )}
                  <button
                    onClick={resetGame}
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {gameMode === "matching" && (
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Planet Fact Matching</h2>
                    <p className="text-white/60 mt-1">Match each planet with its unique fact!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">
                      {score}/{matchingPairs.length}
                    </div>
                    <p className="text-sm text-white/60">Matched</p>
                  </div>
                </div>

                {allMatched ? (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
                    <p className="text-white/70 mb-6">You matched all planets correctly!</p>
                    <button
                      onClick={resetGame}
                      className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-fuchsia-500"
                    >
                      Play Again
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {matchingPairs.map((pair, index) => (
                      <button
                        key={index}
                        onClick={() => handleMatchingClick(index)}
                        disabled={pair.matched}
                        className={`rounded-xl border p-4 text-left transition ${
                          pair.matched
                            ? "border-green-500 bg-green-500/20 text-white opacity-60"
                            : selectedPair === index
                              ? "border-indigo-500 bg-indigo-500/20 text-white"
                              : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <div className="font-semibold mb-1">{pair.planet}</div>
                        <div className="text-sm text-white/70">{pair.fact}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {gameMode === "comparison" && comparisonPlanets[0] && comparisonPlanets[1] && (
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Size Comparison Challenge</h2>
                    <p className="text-white/60 mt-1">Which planet is larger?</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">
                      {comparisonScore}
                    </div>
                    <p className="text-sm text-white/60">Correct</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {[0, 1].map((index) => {
                    const planet = comparisonPlanets[index];
                    if (!planet) return null;
                    const isLarger = (planet.size ?? 0) > (comparisonPlanets[1 - index]?.size ?? 0);
                    const showResult = comparisonGuess !== null;

                    return (
                      <button
                        key={index}
                        onClick={() => handleComparisonGuess(index === 0 ? "first" : "second")}
                        disabled={comparisonGuess !== null}
                        className={`rounded-xl border p-6 text-center transition ${
                          showResult
                            ? comparisonGuess === (index === 0 ? "first" : "second")
                              ? isLarger
                                ? "border-green-500 bg-green-500/20"
                                : "border-red-500 bg-red-500/20"
                              : "border-white/10 bg-white/5 opacity-50"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <div className="mb-4 flex justify-center">
                          <div
                            className="h-24 w-24 rounded-full"
                            style={{
                              background: `radial-gradient(120% 120% at 30% 30%, ${planet.glow} 0%, ${planet.color} 35%, #0b1020 80%)`,
                              boxShadow: `0 0 30px ${planet.glow}55`,
                            }}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{planet.name}</h3>
                        <p className="text-white/60 text-sm">Size: {planet.size?.toFixed(1)}x Earth</p>
                        {showResult && comparisonGuess === (index === 0 ? "first" : "second") && (
                          <div className="mt-3">
                            {isLarger ? (
                              <CheckCircle2 className="h-6 w-6 text-green-400 mx-auto" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-400 mx-auto" />
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {comparisonGuess && (
                  <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 mb-4">
                    <p className="text-white/90 text-center">
                      {comparisonPlanets[0]!.size! > comparisonPlanets[1]!.size!
                        ? `${comparisonPlanets[0]!.name} is larger!`
                        : `${comparisonPlanets[1]!.name} is larger!`}
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-white/60 mb-4">Round {comparisonRound + 1}</p>
                  <button
                    onClick={resetGame}
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
