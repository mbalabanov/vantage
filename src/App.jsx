import { useState, useRef, useEffect } from 'react'
import {
  CheckCircle2, Clock, Zap, BookOpen, Activity, Target,
  TrendingUp, Shield, Database, Rocket, Layers, ChevronDown, Search,
  MessageSquare, X, Send, Sparkles, Settings, Eye, EyeOff,
} from 'lucide-react'

// Static Data
const projects = [
  { id: 1,  name: 'Project Artemis',   subtitle: 'Core API Modernization'             },
  { id: 2,  name: 'Project Apollo',    subtitle: 'Cloud Infrastructure Migration'     },
  { id: 3,  name: 'Project Athena',    subtitle: 'Enterprise Knowledge Management'   },
  { id: 4,  name: 'Project Hermes',    subtitle: 'Real-Time Messaging Platform'      },
  { id: 5,  name: 'Project Hera',      subtitle: 'Workforce Management Suite'        },
  { id: 6,  name: 'Project Poseidon',  subtitle: 'Data Lake &amp; Analytics Pipeline'    },
  { id: 7,  name: 'Project Ares',      subtitle: 'Cybersecurity Threat Response'     },
  { id: 8,  name: 'Project Demeter',   subtitle: 'Supply Chain Optimisation'         },
  { id: 9,  name: 'Project Hestia',    subtitle: 'Internal Developer Portal'         },
  { id: 10, name: 'Project Dionysus',  subtitle: 'Customer Experience Personalisation'},
  { id: 11, name: 'Project Persephone',subtitle: 'Hybrid Work Transition Programme'  },
  { id: 12, name: 'Project Hephaestus',subtitle: 'Manufacturing Automation Platform' },
]

const projectMeta = {
  name: 'Project Artemis: Core API Modernization',
  objective: 'Migrate legacy authentication and scale database throughput by 40%.',
  totalProgress: 68,
  status: 'On Track',
}

const jiraTickets = [
  { id: 'ART-402', title: 'Refactor JWT middleware for RS256 asymmetric signing', status: 'Done', priority: 'High', type: 'Task', aiSummary: 'Upgraded login security to industry-standard encryption.' },
  { id: 'ART-405', title: 'Implement Redis-backed rate limiting for /v2/auth endpoints', status: 'Done', priority: 'Medium', type: 'Feature', aiSummary: 'Protected the system against login brute-force attacks.' },
  { id: 'ART-410', title: 'Fix race condition in PostgreSQL connection pooler', status: 'Done', priority: 'Critical', type: 'Bug', aiSummary: 'Resolved intermittent database crashes during peak traffic.' },
  { id: 'ART-412', title: 'Data migration script for UserProfile v1 to v2', status: 'In Progress', priority: 'High', type: 'Migration', aiSummary: 'Currently moving user records to the new optimized schema.' },
]

const confluenceUpdates = [
  { page: 'Security Architecture v2', updateType: 'Edit', user: 'Sarah (Lead Architect)', aiContext: 'Updated the compliance checklist for the upcoming audit.' },
  { page: 'API Deployment Roadmap', updateType: 'New Page', user: 'Marcus (Product Manager)', aiContext: 'Defined the final three milestones for Q3 release.' },
]

const horizonMilestones = [
  { name: 'Auth Security Hardening', status: 'Completed',   percentage: 100 },
  { name: 'Database Scalability',    status: 'In Progress', percentage: 45  },
  { name: 'External API Beta',       status: 'Upcoming',    percentage: 0   },
]

const PRIORITY_BADGE = {
  Critical: 'bg-red-50 text-red-700 border-red-200',
  High:     'bg-orange-50 text-orange-700 border-orange-200',
  Medium:   'bg-amber-50 text-amber-700 border-amber-200',
  Low:      'bg-green-50 text-green-700 border-green-200',
}

const MILESTONE_ICON = {
  'Auth Security Hardening': Shield,
  'Database Scalability':    Database,
  'External API Beta':       Rocket,
}

function getMilestoneStyle(status) {
  switch (status) {
    case 'Completed':   return { bar: 'bg-indigo-600', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
    case 'In Progress': return { bar: 'bg-amber-500',  badge: 'bg-amber-50 text-amber-700 border-amber-200'   }
    default:            return { bar: 'bg-slate-200',  badge: 'bg-slate-50 text-slate-500 border-slate-200'   }
  }
}

function getRoadmapStyle(status) {
  switch (status) {
    case 'Completed':
      return { node: 'bg-indigo-600 border-indigo-600', nodeIcon: 'text-white',     badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', Icon: CheckCircle2 }
    case 'In Progress':
      return { node: 'bg-white border-amber-400',       nodeIcon: 'text-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200',    Icon: Clock }
    default:
      return { node: 'bg-white border-slate-200',       nodeIcon: 'text-slate-400', badge: 'bg-slate-50 text-slate-500 border-slate-200',    Icon: Rocket }
  }
}

function VantageLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vantage logo" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="vantageBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#vantageBg)" />
      <rect width="36" height="18" rx="9" fill="white" fillOpacity="0.04" />
      <path d="M7 9 L18 27" stroke="white" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.95" />
      <path d="M29 9 L18 27" stroke="white" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.42" />
      <path d="M7 9 L29 9" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.2" />
      <circle cx="18" cy="27" r="2" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

function AiBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-bold tracking-widest uppercase select-none">
      <Zap size={9} strokeWidth={3} />AI
    </span>
  )
}

function SectionHeader({ icon: Icon, label, badge }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-slate-100">
          <Icon size={14} strokeWidth={2} className="text-slate-500" />
        </div>
        <span className="text-xs font-bold tracking-widest uppercase text-slate-500">{label}</span>
      </div>
      {badge}
    </div>
  )
}

function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}

function PriorityBadge({ priority }) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${PRIORITY_BADGE[priority] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
      {priority}
    </span>
  )
}

function TypeBadge({ type }) {
  return (
    <span className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-full">
      {type}
    </span>
  )
}

function JiraId({ id }) {
  return (
    <span className="font-mono text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
      {id}
    </span>
  )
}

function CircularProgress({ pct }) {
  const r    = 52
  const circ = 2 * Math.PI * r
  return (
    <div className="relative inline-flex items-center justify-center w-36 h-36 flex-shrink-0">
      <svg width="144" height="144" className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="vantageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <circle cx="72" cy="72" r={r} strokeWidth="10" stroke="#f1f5f9" fill="none" />
        <circle cx="72" cy="72" r={r} strokeWidth="10" stroke="url(#vantageGrad)" fill="none" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-slate-900 tabular-nums leading-none">{pct}%</span>
        <span className="mt-1 text-[10px] font-bold tracking-widest uppercase text-slate-400">Complete</span>
      </div>
    </div>
  )
}

function TicketItem({ ticket, iconEl }) {
  return (
    <li className="flex gap-3">
      <div className="flex-shrink-0 mt-0.5">{iconEl}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 leading-snug">{ticket.aiSummary}</p>
        <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-1">{ticket.title}</p>
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <JiraId id={ticket.id} />
          <PriorityBadge priority={ticket.priority} />
          <TypeBadge type={ticket.type} />
        </div>
      </div>
    </li>
  )
}

function PulseView() {
  const done       = jiraTickets.filter(t => t.status === 'Done')
  const inProgress = jiraTickets.filter(t => t.status === 'In Progress')

  const doneIcon = (
    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
      <CheckCircle2 size={12} strokeWidth={2.5} className="text-emerald-500" />
    </div>
  )
  const progressIcon = (
    <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
      <Clock size={11} strokeWidth={2.5} className="text-amber-500" />
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader icon={Activity} label="Weekly Delta" badge={<AiBadge />} />
        <p className="text-base font-bold text-slate-900 mb-2">
          Weekly Velocity: <span className="text-indigo-600">High</span>
        </p>
        <p className="text-sm leading-relaxed text-slate-500">
          The team successfully solidified the security foundation (ART-402, ART-405) while stabilizing database performance (ART-410). Documentation is now fully aligned with the new architecture, and the active data migration (ART-412) is progressing without blockers.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeader icon={CheckCircle2} label="Work Completed This Week" />
          <ul className="space-y-5">
            {done.map(ticket => (
              <TicketItem key={ticket.id} ticket={ticket} iconEl={doneIcon} />
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          <Card>
            <SectionHeader icon={Clock} label="Next Steps" />
            <ul className="space-y-4">
              {inProgress.map(ticket => (
                <TicketItem key={ticket.id} ticket={ticket} iconEl={progressIcon} />
              ))}
            </ul>
          </Card>

          <Card>
            <SectionHeader icon={BookOpen} label="Confluence Updates" />
            <ul className="space-y-4">
              {confluenceUpdates.map((u, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <BookOpen size={11} strokeWidth={2} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{u.aiContext}</p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${u.updateType === 'New Page' ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        {u.updateType}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{u.page}</span>
                      <span className="text-slate-300 text-xs">.</span>
                      <span className="text-[11px] text-slate-400">{u.user}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

function HorizonView() {
  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader icon={Target} label="Project Health" badge={<AiBadge />} />
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <CircularProgress pct={projectMeta.totalProgress} />
          <div className="flex-1 min-w-0">
            <p className="text-xl font-extrabold text-slate-900 leading-tight">
              {projectMeta.totalProgress}% of Project Objectives Met
            </p>
            <div className="mt-2 mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">{projectMeta.status}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              We have achieved full security compliance ahead of schedule. The current focus has shifted to Database Scalability (45% complete). All indicators remain positive for the Q3 Beta release.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Project Objective</p>
              <p className="text-sm font-medium text-slate-700">{projectMeta.objective}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeader icon={Layers} label="Objective Mapping" />
          <div className="space-y-6">
            {horizonMilestones.map(m => {
              const ObjIcon      = MILESTONE_ICON[m.name] ?? Target
              const { bar, badge } = getMilestoneStyle(m.status)
              return (
                <div key={m.name} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <ObjIcon size={17} strokeWidth={1.75} className="text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-800">{m.name}</span>
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>{m.status}</span>
                        <span className="text-xs font-bold text-slate-700 tabular-nums w-8 text-right">{m.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${bar}`} style={{ width: `${m.percentage}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <SectionHeader icon={TrendingUp} label="Roadmap" />
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-100" />
            <ol className="space-y-7 relative">
              {horizonMilestones.map(m => {
                const { node, nodeIcon, badge, Icon } = getRoadmapStyle(m.status)
                return (
                  <li key={m.name} className="flex gap-4 items-start">
                    <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${node}`}>
                      <Icon size={13} strokeWidth={2.5} className={nodeIcon} />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-bold text-slate-800">{m.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>{m.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {m.status === 'Completed'   && 'Full security compliance delivered. Audit-ready documentation signed off.'}
                        {m.status === 'In Progress' && `${m.percentage}% complete - schema migration underway, targeting end of sprint.`}
                        {m.status === 'Upcoming'    && 'Scheduled for Q3. Dependent on Database Scalability milestone.'}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ChatPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I can help answer questions about your current project. Ask me anything about Project Artemis.' }
  ])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    const userMessage = { role: 'user', text: inputText }
    const botResponse = {
      role: 'assistant',
      text: 'This is a non-functional prototype that is not connected to an AI. In the full version, this chat would provide real-time insights about your project data, answer questions about progress, risks, timelines, and team velocity based on live Jira and Confluence data.'
    }

    setMessages(prev => [...prev, userMessage, botResponse])
    setInputText('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
      <div
        className="pointer-events-auto w-full sm:w-96 h-[600px] bg-white rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none shadow-2xl flex flex-col"
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50">
              <MessageSquare size={18} strokeWidth={2} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Ask Vantage</h3>
              <p className="text-xs text-slate-500">AI Project Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Instructions */}
        <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
          <p className="text-xs text-indigo-700 leading-relaxed">
            Ask questions about project progress, risks, timelines, blockers, and team velocity.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <Sparkles size={14} className="text-indigo-600" />
                </div>
              )}
              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">You</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your project..."
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8 text-slate-800">
      <Card className="mb-8">
        <h1 className="text-4xl font-bold mb-4">About Vantage</h1>
        <p className="text-lg leading-relaxed text-slate-600 mb-6">
          Vantage is a modern executive intelligence dashboard that synthesizes project data from Jira and Confluence into clear, actionable business insights.
        </p>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Purpose</h2>
        <p className="text-sm leading-relaxed text-slate-600 mb-4">
          Most teams scatter critical project information across multiple tools. Developers live in Jira. Leaders read Confluence. Nobody has a unified view of progress.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          Vantage bridges this gap by ingesting raw technical data from your existing systems and reframing it as strategic intelligence. It translates tickets into outcomes and roadmaps into narrative clarity.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-xl font-bold mb-3 text-indigo-600">Pulse View</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            Operational insight for execution teams. See what was completed this week, understand immediate next steps, and stay aligned on day-to-day progress.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-bold mb-3 text-sky-500">Horizon View</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            Strategic insight for leadership. Track objective completion, visualize roadmap status, and understand project health at a glance.
          </p>
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>AI-Powered Summaries. Technical work is instantly translated into business language.</li>
          <li>Dual Perspective. Switch between Pulse and Horizon views with one click.</li>
          <li>Unified Data Stream. Jira tickets and Confluence updates appear together.</li>
          <li>Non-Disruptive. Reads from existing tools. No data entry, no new systems.</li>
          <li>Executive-Ready Design. Built for C-suite consumption and presentation-ready screenshots.</li>
        </ul>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Configuration & Settings</h2>
        <p className="text-sm leading-relaxed text-slate-600 mb-4">
          Vantage connects seamlessly to your Atlassian ecosystem through secure service account integration. The Settings page provides a centralized location to manage all connection configurations.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Jira Instance Selection</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Choose which Jira environment to connect to: Production, Staging, or Development. Vantage automatically syncs tickets, sprints, and epics from the selected instance in real-time. Switch between instances without losing your configuration.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Confluence Instance Selection</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Select your Confluence workspace to monitor documentation updates, page changes, and team collaboration. Vantage tracks all spaces and surfaces relevant documentation context alongside technical work.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Service Account Credentials</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Secure authentication through dedicated service account credentials. Configure your Atlassian email, API token, and organization ID once. All credentials are encrypted at rest and in transit. Connection status and sync timing are displayed in real-time, with automatic token rotation notifications.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>Standup Briefings. Start your day with Pulse View to see what shipped.</li>
          <li>Sprint Planning. Reference Pulse and Horizon together to scope priorities.</li>
          <li>Stakeholder Updates. Pull Horizon View into status reports with zero extra work.</li>
          <li>Investor Pitch. Show project health and roadmap in under 30 seconds.</li>
          <li>Cross-Functional Alignment. Engineering, product, and leadership see the same data.</li>
        </ul>
      </Card>
    </main>
  )
}

function SettingsPage() {
  const [showToken, setShowToken] = useState(false)
  const [selectedJira, setSelectedJira] = useState('jira-prod')
  const [selectedConfluence, setSelectedConfluence] = useState('confluence-prod')

  const jiraInstances = [
    { id: 'jira-prod', name: 'Production Jira', url: 'https://mycompany.atlassian.net', projects: '47 projects' },
    { id: 'jira-staging', name: 'Staging Jira', url: 'https://staging-mycompany.atlassian.net', projects: '23 projects' },
    { id: 'jira-dev', name: 'Development Jira', url: 'https://dev-mycompany.atlassian.net', projects: '12 projects' },
  ]

  const confluenceInstances = [
    { id: 'confluence-prod', name: 'Production Confluence', url: 'https://mycompany.atlassian.net/wiki', spaces: '34 spaces' },
    { id: 'confluence-staging', name: 'Staging Confluence', url: 'https://staging-mycompany.atlassian.net/wiki', spaces: '18 spaces' },
    { id: 'confluence-dev', name: 'Development Confluence', url: 'https://dev-mycompany.atlassian.net/wiki', spaces: '9 spaces' },
  ]

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-sm text-slate-500">Configure your Atlassian integrations and service account credentials</p>
      </div>

      {/* Jira Instances */}
      <Card className="mb-6">
        <SectionHeader icon={Target} label="Jira Instances" />
        <p className="text-sm text-slate-600 mb-6">
          Select the Jira instance you want to connect to. Vantage will sync tickets, sprints, and epics in real-time.
        </p>
        <div className="space-y-3">
          {jiraInstances.map(instance => (
            <label
              key={instance.id}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedJira === instance.id
                  ? 'border-indigo-500 bg-indigo-50/50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="jira-instance"
                value={instance.id}
                checked={selectedJira === instance.id}
                onChange={(e) => setSelectedJira(e.target.value)}
                className="mt-1 w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-900">{instance.name}</span>
                  {selectedJira === instance.id && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono mb-1">{instance.url}</p>
                <p className="text-xs text-slate-400">{instance.projects}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Confluence Instances */}
      <Card className="mb-6">
        <SectionHeader icon={BookOpen} label="Confluence Instances" />
        <p className="text-sm text-slate-600 mb-6">
          Select the Confluence instance you want to connect to. Vantage will monitor pages, updates, and documentation changes.
        </p>
        <div className="space-y-3">
          {confluenceInstances.map(instance => (
            <label
              key={instance.id}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedConfluence === instance.id
                  ? 'border-indigo-500 bg-indigo-50/50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="confluence-instance"
                value={instance.id}
                checked={selectedConfluence === instance.id}
                onChange={(e) => setSelectedConfluence(e.target.value)}
                className="mt-1 w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-900">{instance.name}</span>
                  {selectedConfluence === instance.id && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono mb-1">{instance.url}</p>
                <p className="text-xs text-slate-400">{instance.spaces}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Service Account Credentials */}
      <Card className="mb-6">
        <SectionHeader icon={Shield} label="Service Account Credentials" />
        <p className="text-sm text-slate-600 mb-6">
          Vantage uses a service account to securely access your Atlassian data. Your credentials are encrypted and never shared.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Atlassian Email / Username
            </label>
            <input
              type="email"
              value="vantage-service@mycompany.com"
              readOnly
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              API Token
            </label>
            <div className="relative">
              <input
                type={showToken ? 'text' : 'password'}
                value="ATATT3xFfGF0bJ8rK9mN2pQ4sU6vW8xYzA0bC1dE3fG5hI7jK9lM2nO4pQ6rS8tU0vW2xY"
                readOnly
                className="w-full px-4 py-2.5 pr-12 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Last rotated: March 15, 2026 · Expires: September 15, 2026
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Organization ID
            </label>
            <input
              type="text"
              value="org-7f8e9d0c1b2a3456"
              readOnly
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">Connected</span>
            </div>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">Last synced: 2 minutes ago</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">Next sync: in 8 minutes</span>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </main>
  )
}

function ViewToggle({ view, setView }) {
  const options = [
    { id: 'pulse',   label: 'Pulse',   Icon: Activity   },
    { id: 'horizon', label: 'Horizon', Icon: TrendingUp },
  ]
  return (
    <div className="flex items-center bg-slate-800 rounded-xl p-1 gap-0.5">
      {options.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-[9px] text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none ${
            view === id
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon size={13} strokeWidth={2.5} />
          {label}
        </button>
      ))}
    </div>
  )
}

function ProjectSwitcher() {
  const [open, setOpen]         = useState(false)
  const [query, setQuery]       = useState('')
  const [selected, setSelected] = useState(projects[0])
  const [showToast, setShowToast] = useState(false)
  const ref                     = useRef(null)
  const toastTimerRef           = useRef(null)
  const demoProjectId           = projects[0].id

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const filtered = projects.filter(p =>
    `${p.name} ${p.subtitle}`.toLowerCase().includes(query.toLowerCase())
  )

  function triggerDemoToast() {
    setShowToast(true)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setShowToast(false), 3200)
  }

  function select(p) {
    if (p.id !== demoProjectId) {
      setOpen(false)
      setQuery('')
      triggerDemoToast()
      return
    }
    setSelected(p)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/70 transition-colors cursor-pointer max-w-xs"
      >
        <Layers size={12} className="text-slate-500 flex-shrink-0" />
        <span className="text-slate-300 text-xs truncate max-w-[220px]">
          <span className="font-semibold">{selected.name}</span>
          <span className="text-slate-500">: {selected.subtitle}</span>
        </span>
        <ChevronDown
          size={12}
          className={`text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-700">
            <Search size={13} className="text-slate-500 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Filter projects..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-slate-200 text-xs placeholder-slate-600 outline-none"
            />
          </div>

          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-xs text-slate-500 text-center">No projects found</li>
            )}
            {filtered.map(p => (
              <li key={p.id}>
                <button
                  onClick={() => select(p)}
                  className={`w-full text-left px-4 py-2.5 flex flex-col gap-0.5 hover:bg-slate-700/60 transition-colors cursor-pointer ${
                    selected.id === p.id ? 'bg-indigo-600/20' : ''
                  }`}
                >
                  <span className={`text-xs font-semibold ${
                    selected.id === p.id ? 'text-indigo-300' : 'text-slate-200'
                  }`}>{p.name}</span>
                  <span className="text-[11px] text-slate-500 leading-snug">{p.subtitle}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-6 top-28 z-[70] max-w-md rounded-xl border border-amber-300/40 bg-slate-900/95 px-4 py-3 shadow-2xl shadow-black/50"
        >
          <p className="text-sm font-semibold text-amber-300">Demo Notice</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-200">
            This is a demo. Only Project Artemis: Core API Modernization has data to show.
          </p>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [view, setView] = useState('pulse')
  const [chatOpen, setChatOpen] = useState(false)
  const isPulse = view === 'pulse'
  const isDashboard = page === 'dashboard'

  return (
    <div
      className="min-h-screen font-sans"
      style={isDashboard && isPulse
        ? { backgroundColor: '#f8fafc', transition: 'background 0.5s ease' }
        : isDashboard
        ? { background: 'linear-gradient(145deg, #0b0f1e 0%, #151b3a 45%, #0e172e 100%)', transition: 'background 0.5s ease' }
        : { backgroundColor: '#f8fafc', transition: 'background 0.5s ease' }
      }
    >
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between gap-6">
          <button
            onClick={() => {
              setPage('dashboard')
              setView('pulse')
            }}
            className="flex items-center gap-4 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="shadow-lg shadow-indigo-900/50 rounded-[12px]">
              <VantageLogo size={52} />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-white font-extrabold text-3xl tracking-tight">Vantage</span>
              <span className="hidden sm:block text-slate-500 text-sm font-medium">Project Progress Intelligence</span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {isDashboard && <ProjectSwitcher />}
            {isDashboard && <ViewToggle view={view} setView={setView} />}
            {!isDashboard && (
              <button
                onClick={() => {
                  setPage('dashboard')
                  setView('pulse')
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer bg-slate-700 text-slate-300 hover:bg-slate-600"
              >
                <Activity size={13} strokeWidth={2.5} />
                Dashboard
              </button>
            )}
            <button
              onClick={() => setPage('docs')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                page === 'docs'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <BookOpen size={13} strokeWidth={2.5} />
              Docs
            </button>
            <button
              onClick={() => setPage('settings')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                page === 'settings'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Settings size={13} strokeWidth={2.5} />
              Settings
            </button>
          </div>
        </div>
      </header>

      {page === 'dashboard' ? (
        <>
          <div className={`border-b transition-colors duration-500 ${
            isPulse
              ? 'bg-white border-slate-100'
              : 'border-white/5'
          }`}
            style={!isPulse ? { backgroundColor: 'rgba(15,20,45,0.85)', backdropFilter: 'blur(8px)' } : undefined}
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
              <div>
                <h1 className={`text-[45px] font-bold leading-tight ${isPulse ? 'text-emerald-600' : 'text-sky-400'}`}>
                  {isPulse ? 'Pulse View' : 'Horizon View'}
                </h1>
                <p className={`text-xs mt-0.5 ${isPulse ? 'text-slate-400' : 'text-indigo-300/70'}`}>
                  {isPulse
                    ? 'Operational snapshot. What was accomplished this week'
                    : 'Strategic overview. Where the project is headed'}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`hidden sm:block text-[11px] ${isPulse ? 'text-slate-400' : 'text-slate-500'}`}>Synced. Jira and Confluence</span>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                  isPulse
                    ? 'bg-emerald-50 border-emerald-100'
                    : 'bg-emerald-500/10 border-emerald-500/25'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-[11px] font-bold ${isPulse ? 'text-emerald-700' : 'text-emerald-400'}`}>Live</span>
                </div>
              </div>
            </div>
          </div>
          <main className="max-w-7xl mx-auto px-6 py-8">
            {isPulse ? <PulseView /> : <HorizonView />}
          </main>
        </>
      ) : page === 'docs' ? (
        <DocsPage />
      ) : (
        <SettingsPage />
      )}

      {/* Floating Chat Button - only show on dashboard */}
      {isDashboard && !chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 flex items-center justify-center z-40"
        >
          <MessageSquare size={24} strokeWidth={2} />
        </button>
      )}

      {/* Chat Panel */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
