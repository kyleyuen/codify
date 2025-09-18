import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Checkpoint 1 Python Loops Learning Platform
          </h1>
          <p className="text-purple-200">
            Master loops in Python through interactive coding exercises
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Objective & Instructions */}
            <div className="glass-card group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h2 className="text-xl font-semibold text-white ml-2">
                  Objective & Instructions
                </h2>
              </div>
              <p className="text-purple-100">
                Understand loops in Python. Complete the exercises below by
                writing code in the editor. You'll practice using for loops,
                while loops, and nested loops to solve problems.
              </p>
              <div className="mt-4 p-3 bg-purple-900/50 rounded-lg">
                <p className="text-purple-200 text-sm">
                  <span className="font-medium">Current Exercise:</span> Create
                  a loop that prints numbers 1 to 10, then 10 to 1
                </p>
              </div>
            </div>

            {/* Concepts Learned */}
            <div className="glass-card group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center">
                  <i className="fas fa-brain text-white text-xs"></i>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Concepts Learned
                </h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">For loops</p>
                    <code className="code-block">
                      for i in range(5): print(i)
                    </code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">While loops</p>
                    <code className="code-block">
                      i = 0; while i &lt; 5: print(i); i += 1
                    </code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Loop nesting</p>
                    <code className="code-block">
                      for i in range(3): for j in range(2): print(i, j)
                    </code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Basic debugging</p>
                    <code className="code-block">
                      print("Check value:", variable)
                    </code>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Code Editor */}
            <div className="glass-card group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
                  <i className="fas fa-code text-white text-xs"></i>
                </div>
                <h2 className="text-xl font-semibold text-white">Code Editor</h2>
                <div className="ml-auto flex items-center gap-2">
                  <button className="text-xs text-purple-300 hover:text-white">
                    <i className="fas fa-redo mr-1"></i> Reset
                  </button>
                  <button className="text-xs text-purple-300 hover:text-white">
                    <i className="fas fa-question-circle mr-1"></i> Hint
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-3 text-sm text-gray-500 font-mono pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <textarea
                  className="w-full h-64 pl-10 py-3 bg-gray-900 text-gray-100 font-mono text-sm rounded-lg border border-purple-700/30 focus:outline-none resize-none"
                  placeholder="# Write your Python code here..."
                  spellCheck="false"
                ></textarea>
              </div>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2">
                <i className="fas fa-paper-plane"></i>
                Submit Code
              </button>
            </div>

            {/* Chat Box / Socratic Dialogue */}
            <div className="glass-card group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-amber-600 flex items-center justify-center">
                  <i className="fas fa-comments text-white text-xs"></i>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Chat
                </h2>
              </div>
              <div className="chat-container mb-4">
                {/* Example static messages */}
                <div className="message message-bot">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-600">
                      <i className="fas fa-robot text-white text-xs"></i>
                    </div>
                    <div>
                      <p className="font-medium">Tutor</p>
                      <p>Question 1: Can you explain how a for loop works?</p>
                    </div>
                  </div>
                </div>
                <div className="message message-user">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-purple-600">
                      <i className="fas fa-user text-white text-xs"></i>
                    </div>
                    <div>
                      <p className="font-medium">You</p>
                      <p>Yes, it repeats code for a set number of times.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question or response..."
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none"
                />
                <button className="px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center">
                  <i className="fas fa-paper-plane">Send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(30, 0, 60, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(139, 92, 246, 0.5);
        }

        .code-block {
          display: block;
          background: rgba(76, 29, 149, 0.6);
          color: #fff;
          padding: 0.5rem;
          border-radius: 8px;
          margin-top: 0.5rem;
          font-family: "Fira Code", monospace;
          font-size: 0.9rem;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        .chat-container {
          height: 250px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .chat-container::-webkit-scrollbar {
          width: 6px;
        }

        .chat-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .chat-container::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }

        .message {
          padding: 0.75rem 1rem;
          margin-bottom: 0.75rem;
          border-radius: 12px;
          max-width: 80%;
        }

        .message-user {
          margin-left: auto;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }

        .message-bot {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

export default App;
