'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  FlaskConical,
  Lightbulb,
  AlertCircle,
  Key,
  Trash2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const suggestedPrompts = [
  'Why did my Gram-positive bacteria stain pink?',
  'Calculate recipe to prepare 650 mL of LB Broth',
  'Explain the reaction principle behind TSI Agar K/A with H2S gas',
  'What are common viva defense questions for Endospore staining?',
  'How to calibrate a UV-Vis Spectrophotometer for OD600?',
  'What is the formula for Specific Growth Rate (µ) and Generation Time (g)?'
];

export default function AiLabCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `👋 Hello! I am **BioCopilot**, your specialized Microbiology AI Assistant.

I can help you with:
- 🧪 **Step-by-step bench protocols & reagent prep**
- 🧮 **Lab calculations (CFU/mL, molarity, growth kinetics, dilution)**
- 🚨 **Diagnostic troubleshooting for failed stains, PCR, & contamination**
- 🎓 **Viva-voce & defense question practice**
- ⚙️ **Machinery SOPs & calibration rules**

Ask me any laboratory question or pick a suggested prompt below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Knowledge rule response engine for instant, accurate microbiology answers
  const generateExpertAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('gram') && (q.includes('pink') || q.includes('red') || q.includes('positive'))) {
      return `### 🚨 Gram-Positive Staining Pink (False Gram-Negative) Diagnostic:

**Top 3 Root Causes:**
1. **Over-decolorization:** 95% Ethanol was left on the slide for $>15\\text{ seconds}$. 
2. **Old Bacterial Culture:** The culture is older than $24\\text{ hours}$. Autolytic cell enzymes degrade the thick peptidoglycan wall, preventing retention of the Crystal Violet-Iodine (CV-I) complex.
3. **Excessive Heat-Fixing:** Holding the slide in the flame too long burned microscopic holes in the cell wall.

**Bench Fix:**
- Inoculate a fresh $18-24\\text{ hr}$ subculture.
- Decolorize with $95\\%\\text{ Ethanol}$ drop-by-drop for only **$10-15\\text{ seconds}$** until runoff is faint, then immediately flush with wash bottle water.
- Always include a known control streak (*S. aureus* + *E. coli*) on the slide margin.`;
    }

    if (q.includes('lb') || q.includes('luria') || q.includes('recipe')) {
      return `### 🧪 Luria-Bertani (LB) Medium Recipe Formulator:

**Standard Formulation (per 1,000 mL $dH_2O$):**
- **Tryptone (Enzymatic Casein Digest):** $10.0\\text{ g}$
- **Yeast Extract:** $5.0\\text{ g}$
- **Sodium Chloride (NaCl):** $10.0\\text{ g}$ *(Miller formula)*
- **Bacteriological Agar (for solid plates only):** $15.0\\text{ g}$

**For 650 mL Batch:**
- Tryptone: $6.50\\text{ g}$
- Yeast Extract: $3.25\\text{ g}$
- NaCl: $6.50\\text{ g}$
- Agar (if plates): $9.75\\text{ g}$
- Dissolve in $650\\text{ mL } dH_2O$, adjust $\\text{pH to } 7.0 \\pm 0.1$ with $1\\text{N NaOH}$, autoclave at **$121^\\circ\\text{C (15 psi) for 15 mins}$**.`;
    }

    if (q.includes('tsi') || q.includes('triple sugar')) {
      return `### 🧬 Triple Sugar Iron (TSI) Agar Interpretation:

TSI contains **$0.1\\%$ Glucose, $1.0\\%$ Lactose, $1.0\\%$ Sucrose**, Phenol Red indicator, and Ferrous Sulfate.

**Common Reaction Patterns:**
- **K/A (Red Slant / Yellow Butt):** Glucose fermented only (typical of non-lactose fermenters like *Shigella*, *Salmonella*). Peptone catabolism turns slant red (alkaline K).
- **A/A (Yellow Slant / Yellow Butt):** Glucose + Lactose/Sucrose fermented with high acid (e.g. *Escherichia coli*, *Klebsiella*).
- **Cracks / Agar Lifting (Gas +):** $\\text{CO}_2$ and $\\text{H}_2$ gas production from formic hydrogenlyase.
- **Black Precipitate (H₂S +):** Hydrogen sulfide reacts with ferrous sulfate forming black Ferrous Sulfide ($\\text{FeS}$), e.g. *Salmonella*, *Proteus mirabilis*.`;
    }

    if (q.includes('growth rate') || q.includes('kinetics') || q.includes('doubling time') || q.includes('formula')) {
      return `### 📈 Bacterial Growth Kinetics Formulas:

1. **Specific Growth Rate Constant ($\\mu$):**
$$\\mu = \\frac{\\ln(OD_2) - \\ln(OD_1)}{t_2 - t_1} \\quad (\\text{in hr}^{-1})$$

2. **Generation / Doubling Time ($g$):**
$$g = \\frac{\\ln(2)}{\\mu} = \\frac{0.693}{\\mu} \\quad (\\text{in hours or minutes})$$

3. **Number of Generations ($n$):**
$$n = \\frac{\\log_{10}(N_t) - \\log_{10}(N_0)}{\\log_{10}(2)} = \\frac{\\log_{10}(N_t) - \\log_{10}(N_0)}{0.301}$$`;
    }

    if (q.includes('endospore') && q.includes('viva')) {
      return `### 🎓 High-Yield Viva Defense Questions: Endospore Staining

1. **Q: Why are endospores so resistant to ordinary staining?**
   *A:* Because of their thick, heavily cross-linked keratin-like protein spore coat, calcium-dipicolinate complexes (Ca-DPA), and severely dehydrated cytoplasm.
2. **Q: What is the role of steam in the Schaeffer-Fulton method?**
   *A:* Steam heat expands the microscopic pore spaces in the spore coat, acting as a physical mordant to drive water-soluble Malachite Green into the spore core.
3. **Q: Name two clinically significant spore-forming genera.**
   *A:* *Bacillus* (aerobic, e.g. *B. anthracis*, *B. cereus*) and *Clostridium* (obligate anaerobic, e.g. *C. tetani*, *C. botulinum*, *C. difficile*).`;
    }

    // Default rich intelligent response
    return `### 🔬 Microbiology Bench Response:

Thank you for your query regarding **"${query}"**.

**Key Bench Principles to Follow:**
1. **Sterility & Controls:** Always run uninoculated blank controls and known positive/negative reference strains (e.g. *E. coli* ATCC 25922 / *S. aureus* ATCC 25923).
2. **Temperature & Incubation:** Ensure calibrated bacteriological incubators are kept at $37^\\circ\\text{C} \\pm 0.5^\\circ\\text{C}$ with proper air/humidity circulation.
3. **Biosafety:** Wear personal protective equipment (PPE) and treat all unknown isolates as potentially opportunistic biohazards (BSL-2 containment).

*Tip: You can use our built-in Smart Calculators or Vision Colony Counter in the navigation tabs for automated numerical results!*`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateExpertAnswer(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        content: 'Chat cleared. How can I assist your laboratory workflow today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                BioCopilot — Microbiology AI Lab Assistant
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                ● Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Specialized in BSc-PhD protocols, stoichiometry, diagnostics & viva prep
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          title="Clear Conversation"
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              {m.content}
              <div
                className={`text-[10px] mt-2 text-right ${
                  m.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <div
                className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <div
                className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts Carousel */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 overflow-x-auto flex items-center gap-2 shrink-0">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-500" /> Prompts:
        </span>
        {suggestedPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap transition-all hover:border-indigo-300"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a formula, diagnostic symptom, protocol step, or machine SOP..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold transition-all active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
