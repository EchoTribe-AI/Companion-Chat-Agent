import { useState, useRef, useEffect } from "react";

// ── BRAND TOKENS ──────────────────────────────────────────────────────────────
const C = {
  teal:    "#7BADA8",
  tealDk:  "#5E9490",
  tealLt:  "#B8D4D1",
  tealXlt: "#EAF3F2",
  sage:    "#A8B89A",
  warm:    "#F7F4EF",
  warmDk:  "#EDE8DF",
  clay:    "#C4A882",
  clayLt:  "#F0E8DB",
  text:    "#2D3A35",
  textMd:  "#5A6B64",
  textLt:  "#8FA097",
  white:   "#FFFFFF",
  border:  "rgba(123,173,168,0.2)",
  shadow:  "0 2px 12px rgba(45,58,53,0.07)",
};

// ── PROGRAM DATA ──────────────────────────────────────────────────────────────

const SESSIONS = [
  {
    num: 1, date: "April 1, 2025", title: "Foundations", status: "complete",
    intention: "I am as powerful as I allow myself to be. I am not finding my path — I am finding my own path.",
    topics: ["Human Design — Generator type (strategy: respond, don't initiate)", "Life history exploration: what was fun, what wasn't", "Passions & childhood activity survey", "Life Wheel assessment", "Self-talk awareness"],
    homework: [
      { id: "s1h1", text: "Reflect on your life — jobs, events, projects. What was fun? What was not? Write the highlights.", done: true },
      { id: "s1h2", text: "Think about childhood activities you were drawn to predominantly.", done: true },
      { id: "s1h3", text: "Think about what you like to do for fun. What are your hobbies?", done: true },
      { id: "s1h4", text: "Complete the Unlocking Your Passions survey.", done: true },
      { id: "s1h5", text: "Complete the Life Wheel chart.", done: true },
      { id: "s1h6", text: "Notice your self-talk and take note of it.", done: true },
    ],
    notes: "Kelly is a Generator type in Human Design. Past business and life challenges have led to self-doubt and hesitation to fully express herself. Program focus: uncovering authentic self and aligning actions with core values. Daily practices — journaling, body awareness, gratitude — will be key homework components.",
    keyInsight: "As a Generator, Kelly's energy is sustainable but she needs to respond rather than initiate. When she acts from response, she has full energy. When she initiates, she can feel frustrated.",
  },
  {
    num: 2, date: "April 15, 2025", title: "Belief Systems & Well-Being", status: "complete",
    intention: "I release limiting beliefs and open to new possibilities.",
    topics: ["Belief systems exploration", "Unlocking Your Passions survey review", "Life Wheel review", "Kelly's average routine audit", "5 Pillars of Well-Being: Sleep, Stress Management, Movement, Emotions, Nutrition"],
    homework: [
      { id: "s2h1", text: "Average Routine worksheet — document your current daily routine.", done: true },
      { id: "s2h2", text: "Transformation Worksheet.", done: true },
      { id: "s2h3", text: "20-minute self-reflection daily.", done: true },
    ],
    notes: "Reviewed Kelly's routine: morning 'me' time (6:30–8:30am) is coffee/Wordle/dog beach walk/social & work scrolling. Kirsten (wife) is a key positive influence — gym together 2x/week. Identified that routine has many passive activities but limited intentional practices. 5 Pillars framework introduced as foundation for well-being.",
    keyInsight: "Kelly's morning routine has potential — it just needs intentional practices woven in rather than fully replaced.",
  },
  {
    num: 3, date: "April 29, 2025", title: "Emotional Control & Habits", status: "complete",
    intention: "I observe my patterns with curiosity, not judgment.",
    topics: ["Journey check & emotional check-in", "Emotional control mechanisms", "Habits and their role in well-being", "Introduced: Cognitive Defusion technique", "Introduced: Breathing practice (5 min daily)"],
    homework: [
      { id: "s3h1", text: "Observe and document your emotional control mechanisms.", done: true },
      { id: "s3h2", text: "Schedule 25 min of me-time daily: 5 min breathing + 10 min journaling or oracle card + 10 min quiet focus (visualization or sensory awareness).", done: true },
      { id: "s3h3", text: "Read page 9 of Resonance February 2024 (bit.ly/Resonance_February2024).", done: false },
      { id: "s3h4", text: "Watch the February community call (youtu.be/4lWBoE49a1g).", done: false },
      { id: "s3h5", text: "Commit to one new positive habit.", done: true },
      { id: "s3h6", text: "Document patterns and emotional control mechanisms.", done: true },
    ],
    notes: "Habits framework introduced: results are 100% dependent on cultivated habits. Once we are well, we can focus on achieving goals. Cognitive defusion introduced as tool for unhooking from unhelpful thoughts. Daily practice structure established: breathing → journaling/oracle → visualization.",
    keyInsight: "The pattern of 'I'm being excluded/forgotten' keeps surfacing at work. This is a thread worth exploring — where does this originate?",
  },
  {
    num: 4, date: "May 13, 2025", title: "Dreams & Vision", status: "complete",
    intention: "I am worthy of my dreams and open to receive them.",
    topics: ["Journey check", "Dreams and Dream Day exercise", "Vision Board creation", "Cognitive Defusion — documented work event reflection", "3-Minute Dream Game", "Responding to disrespect framework"],
    homework: [
      { id: "s4h1", text: "Schedule 30 min of me-time daily: 5 min breathing + 10 min journaling or oracle card + 15 min quiet focus.", done: false },
      { id: "s4h2", text: "Document your dream day in writing.", done: false },
      { id: "s4h3", text: "Create your vision board (digital template provided).", done: false },
    ],
    notes: "Kelly submitted a detailed Cognitive Defusion reflection on the work launch event — irritated, disappointed, unseen when leadership didn't prioritize dedicated team time. Used naming/thanking/floating away techniques well. Key pattern: 'Why does this always happen? Why am I initially important, then excluded?' Irritation toward 2 founders keeps recurring — needs further exploration. Good application of tools in real-world situation.",
    keyInsight: "Kelly is applying cognitive defusion in real time — this is significant growth from Session 1. The recurring exclusion pattern appears tied to her professional identity and worth.",
  },
];

const TOOLS = {
  breathing: {
    label: "Breathwork", icon: "🌬",
    items: [
      { name: "Box Breathing", use: "Emotional regulation", steps: ["Inhale through nose — count 4", "Hold — count 4", "Exhale through mouth — count 4", "Hold — count 4", "Repeat 4–8 times"] },
      { name: "4-7-8 Breathing", use: "Reduce stress & anxiety", steps: ["Inhale through nose — count 4", "Hold your breath — count 7", "Exhale through mouth — count 8", "Repeat the cycle"] },
      { name: "Coherent Breathing", use: "Balance & calm alertness", steps: ["Breathe in through nose — count 6", "Breathe out through nose — count 6", "Maintain a steady rhythm", "Continue for several minutes"] },
      { name: "Sigh Breathing", use: "Release acute anxiety", steps: ["Take a regular breath in through nose", "Without exhaling, take another short inhale", "Release in a long, slow exhale through mouth", "Repeat as needed"] },
      { name: "Breath Retention", use: "Grounding & presence", steps: ["Place left hand on lap, right hand on belly below navel", "Inhale through nose — count 4, belly expands", "Hold — count 2", "Exhale slowly through mouth — count 6, belly deflates", "Repeat 3 times"] },
    ]
  },
  eft: {
    label: "EFT Tapping", icon: "✋",
    items: [
      { name: "Full EFT Round", use: "Release emotional charge on a specific issue",
        steps: [
          "Identify the issue and rate intensity 0–10",
          "Setup: Tap karate chop point (side of hand) and say 3x: 'Even though I have this [issue], I deeply and completely accept myself.'",
          "Tap each point 5–7 times while saying your reminder phrase:",
          "1. Karate chop (side of hand) — 'This [issue]'",
          "2. Top of head — 'This [feeling]'",
          "3. Inner eyebrow — 'This [issue]'",
          "4. Outer eye — 'I feel [emotion]'",
          "5. Under eye — 'This [issue]'",
          "6. Under nose — '[Reminder phrase]'",
          "7. Under lips (chin) — '[Reminder phrase]'",
          "8. Under collarbone — '[Reminder phrase]'",
          "9. Under arm — '[Reminder phrase]'",
          "Take a deep breath. Rate intensity again. Repeat until 3 or below.",
        ]
      },
    ]
  },
  cognitive: {
    label: "Cognitive Tools", icon: "🧠",
    items: [
      { name: "Cognitive Defusion", use: "Unhook from unhelpful recurring thoughts",
        steps: [
          "Name the thought: 'Here's the [label] thought' — e.g., 'Here's the I'm being excluded again thought'",
          "Thank your mind: 'Thank you mind, I appreciate the awareness'",
          "Let it float away: Visualize it on a leaf in a stream, or clip a string with scissors",
          "Choose an intentional response: What would I do if this thought wasn't running the show?",
          "Journal: Write the thought with your non-dominant hand 10 times. Notice what happens.",
        ]
      },
      { name: "Check the Facts (DBT)", use: "Pause and examine if your emotional reaction fits the actual situation",
        steps: [
          "Pause. Ask: What actually happened? (facts only, no interpretation)",
          "Ask: Are my thoughts and feelings based on facts, or interpretations?",
          "Ask: Is my emotional response appropriate to the situation?",
          "Adjust your reaction to better fit reality",
        ]
      },
      { name: "The 4-Step Recipe", use: "When you're stuck, triggered, or up against a limit",
        steps: [
          "1. Don't Feed Fears — Acknowledge the emotion but don't feed it stories. Say: 'I see you, [emotion]. We can only change the present moment.'",
          "2. Don't Quit — You don't have to conquer it today. Just inch toward the vision.",
          "3. Identify Something to Be Grateful For — From every hard situation, there is always something. That is how we transmute difficulty into wisdom.",
          "4. Ask How Your Future Self Would Handle This — What would they do? What do they recommend? If it was easy, what would easy look like?",
        ]
      },
      { name: "ABC Skills (DBT)", use: "Build emotional resilience proactively",
        steps: [
          "A — Accumulate Positive Emotions: Schedule activities that bring joy or satisfaction. Don't wait for them.",
          "B — Build Mastery: Do things that make you feel competent. Even small tasks boost emotional strength.",
          "C — Cope Ahead: Anticipate emotionally challenging situations. Visualize yourself handling them with your skills.",
        ]
      },
    ]
  },
  transmute: {
    label: "Transmute Emotions", icon: "🔥",
    items: [
      { name: "Opening Ritual", use: "Before working with a difficult emotion",
        steps: [
          "Place your hand on your heart. Close your eyes.",
          "Once you feel your heartbeat, take 3 deep breaths.",
          "Read or say the intention: 'I intend to look at [name the challenge] through the eyes of love in order to find the wisdom in the situation. In doing so I will fully overcome what holds me back.'",
          "Repeat the intention 3 times. Take 3 more deep breaths. Open your eyes.",
        ]
      },
      { name: "IEMT Eye Movement", use: "Reduce intensity of a specific emotional memory",
        steps: [
          "Bring the specific memory to mind. Rate its emotional intensity 0–10.",
          "Align your head looking straight ahead.",
          "With eyes open or closed, move eyes side to side all the way to the edges (30 seconds).",
          "Then move eyes diagonally: top-right to bottom-left, then top-left to bottom-right.",
          "Close eyes. Take 3 deep breaths.",
          "Rate the emotion again — intensity should have decreased.",
          "Repeat until emotion measures 3 or below.",
        ]
      },
      { name: "Closing Ritual", use: "After completing emotional work",
        steps: [
          "Place your hand on your heart. Close your eyes.",
          "Once you feel your heartbeat, take 3 deep breaths.",
          "Say or read: 'Thank you universe for the healing that has already been given to my heart wounds, limiting beliefs, and blocks. It feels so good to be free and flowing.'",
          "Take 3 more deep breaths. Open your eyes.",
        ]
      },
    ]
  },
  journaling: {
    label: "Journaling", icon: "📓",
    items: [
      { name: "Kick Off Your Day with Intention", use: "Morning grounding practice",
        steps: ["Set a clear intention for the day — one sentence", "What am I grateful for right now?", "What is the ONE thing I want to feel by the end of today?", "What is one small step I can take toward my vision?"]
      },
      { name: "Emotional Pattern Journal", use: "After a triggering event",
        steps: ["Observed thought or trigger — what happened?", "Emotional response — what did I feel?", "Body awareness — where did I feel it in my body?", "Thought pattern — what did my mind keep returning to?", "Cognitive defusion technique I used", "Outcome and reflection"]
      },
      { name: "Self-Reflection Journal", use: "Daily 10-min practice",
        steps: ["What am I feeling right now — without judgment?", "What's one thought that keeps showing up today?", "What would my future self say about this moment?", "What am I grateful for — even in this difficulty?"]
      },
    ]
  },
};

const DAILY_PRACTICE = [
  { id: "dp1", time: "5 min", label: "Breathwork", detail: "Choose one: Box, 4-7-8, Coherent, or Sigh breathing", icon: "🌬", required: true },
  { id: "dp2", time: "10 min", label: "Journal or Oracle Card", detail: "Journaling prompt OR pull one oracle card and journal the message without the guidebook", icon: "📓", required: true },
  { id: "dp3", time: "15 min", label: "Quiet Focus", detail: "Visualization: white powerful light filling your body, OR awareness of your 5 senses (cold, hot, sounds, sensations)", icon: "✨", required: true },
];

// ── AI SYSTEM PROMPT ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the YouX AI Coach, a warm and grounded coaching assistant for Kelly Hagen Kasai, a client in Neysha Arcelay's "Unleashed: The YouX Experience" coaching program.

## ABOUT KELLY
- Human Design: Generator type. Strategy: respond, don't initiate. When acting from response, she has full sustainable energy. When initiating, she can feel frustrated.
- Key themes from sessions: self-doubt from past business challenges, hesitation to fully express herself, recurring pattern of feeling excluded/forgotten at work, building authentic self-expression
- Relationship: Married to Kirsten (very positive influence — gym together 2x/week, constantly bringing ideas/experiences)
- Strengths observed: Excellent self-awareness, applies cognitive defusion in real time, shows up consistently

## SESSION HISTORY (4 sessions complete)
Session 1 (April 1): Human Design, Life Wheel, passions survey, self-talk awareness
Session 2 (April 15): Belief systems, routine audit, 5 Pillars of Well-Being (Sleep, Stress, Movement, Emotions, Nutrition)
Session 3 (April 29): Emotional control mechanisms, habits, cognitive defusion introduced, daily practice structure established
Session 4 (May 13): Dreams & vision board, cognitive defusion real-world application (work launch event), recurring exclusion pattern identified

## CURRENT HOMEWORK (Session 4, open)
- Schedule 30 min daily me-time: 5 min breathing + 10 min journaling/oracle card + 15 min quiet focus
- Document your dream day
- Create your vision board

## DAILY PRACTICE STRUCTURE
5 min breathwork → 10 min journaling or oracle card → 15 min quiet focus (visualization or sensory awareness)

## TOOLS AVAILABLE
1. BREATHWORK: Box (4-4-4-4), 4-7-8, Coherent (6-6), Sigh breathing, Breath Retention
2. EFT TAPPING: 9 tapping points — Karate chop setup, then: top of head, inner eyebrow, outer eye, under eye, under nose, under lips, under collarbone, under arm. Setup phrase: "Even though I have this [issue], I deeply and completely accept myself."
3. COGNITIVE TOOLS:
   - Cognitive Defusion: Name the thought → Thank your mind → Let it float away → Choose intentional response
   - Check the Facts (DBT): What actually happened? Are feelings based on facts or interpretation? Is the response proportionate?
   - 4-Step Recipe: Don't feed fears → Don't quit → Find gratitude → Ask future self
   - ABC Skills (DBT): Accumulate positive emotions / Build mastery / Cope ahead
4. TRANSMUTING NEGATIVE EMOTIONS: Opening ritual (hand on heart + intention) → IEMT eye movement therapy → Closing ritual
5. JOURNALING: Morning intention, emotional pattern documentation, self-reflection prompts
6. DBT EMOTIONAL REGULATION: Pay Attention to Positive Events, Check the Facts, ABC skills

## BEHAVIOR GUIDELINES
- Be warm, grounded, and empowering — never preachy or clinical
- Always suggest the SMALLEST useful next step (under 5 minutes when possible)
- When Kelly is overwhelmed or triggered: lead with breathwork first, then a cognitive tool
- When Kelly asks "what's next?": check her open homework and suggest the most approachable piece
- Remind Kelly of her Generator nature when she's pushing hard or feels frustrated from initiating
- Reference her specific patterns and history when relevant (e.g., the exclusion pattern, the work launch event)
- For any tool: give the steps clearly and concisely — don't just describe, guide
- Encourage journaling after any practice
- If she mentions a cognitive distortion, name it gently and offer defusion or Check the Facts
- You can reference the emotional scale (Joy at top, Fear/Powerlessness at bottom) to help her locate where she is and move up one step at a time
- Never give medical, clinical, or diagnostic advice
- If she seems in real distress, validate and suggest reaching out to Neysha or a professional`;

const COACH_SYSTEM_PROMPT = `You are a coaching intelligence assistant for Neysha Arcelay, supporting her work with client Kelly Hagen Kasai in the YouX Experience program.

## ABOUT THIS CLIENT
Kelly Hagen Kasai — 4 sessions complete (Sessions 1–4, April–May 2025)
- Human Design: Generator (respond, don't initiate)
- Core pattern: Recurring feeling of exclusion/being forgotten at work; self-doubt from past business challenges
- Strengths: Strong self-awareness, applies tools (cognitive defusion) in real time, consistent attendance
- Current open homework: Dream day document, vision board creation, 30 min daily practice

## SESSION NOTES SUMMARY
S1: Life history, Human Design, passions survey, Life Wheel — strong foundation session
S2: Belief systems, 5 Pillars of Well-Being, routine audit — identified passive morning routine, introduced well-being framework
S3: Emotional control mechanisms, habits, cognitive defusion — established daily practice structure (5+10+15 format)
S4: Dreams/vision, documented work event (company launch exclusion), cognitive defusion applied — KEY: "Why does this always happen? Why am I initially important then excluded/forgotten?" pattern identified

## WHAT YOU CAN HELP WITH
- Pre-session prep: What to focus on, patterns to explore, Kelly's recent homework completion
- Post-session: Draft follow-up notes, identify next homework to assign
- Pattern analysis: Surface recurring themes across sessions
- Tool recommendations: Which tools are most relevant given Kelly's current state
- Draft messages: Check-in messages, affirmations, or homework reminders (label all as DRAFTS)

## GUIDELINES
- Be direct, organized, and data-driven — Neysha is the expert; you are her thinking partner
- Never make clinical or diagnostic judgments
- Label all draft communications clearly
- Flag things that need Neysha's direct attention
- Focus on patterns, progress, and next best actions`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Tag({ children, color = C.teal }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 20,
      background: color + "18", color: color, fontSize: 11,
      fontWeight: 600, letterSpacing: "0.04em", border: `1px solid ${color}30`,
    }}>{children}</span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.white, borderRadius: 14, padding: "20px 22px",
      boxShadow: C.shadow, border: `1px solid ${C.border}`, ...style
    }}>{children}</div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>{children}</h2>
      {sub && <p style={{ fontSize: 13, color: C.textLt, margin: "3px 0 0" }}>{sub}</p>}
    </div>
  );
}

// ── SESSIONS VIEW ─────────────────────────────────────────────────────────────

function SessionsView({ isCoach }) {
  const [open, setOpen] = useState(4);
  return (
    <div>
      <SectionTitle sub="Session history, notes, and what was covered">Session Timeline</SectionTitle>
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {SESSIONS.map(s => (
          <button key={s.num} onClick={() => setOpen(s.num)} style={{
            padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
            background: open === s.num ? C.teal : "transparent",
            color: open === s.num ? C.white : C.textMd,
            border: `1.5px solid ${open === s.num ? C.teal : C.border}`,
            cursor: "pointer", transition: "all 0.18s",
          }}>Session {s.num}</button>
        ))}
      </div>
      {SESSIONS.filter(s => s.num === open).map(s => (
        <div key={s.num}>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: C.textLt, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>
                  SESSION {s.num} · {s.date.toUpperCase()}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: C.text, margin: 0 }}>{s.title}</h3>
              </div>
              <Tag color={C.teal}>✓ Complete</Tag>
            </div>
            <div style={{ background: C.tealXlt, borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>TODAY'S INTENTION</div>
              <p style={{ fontSize: 14, color: C.tealDk, fontStyle: "italic", margin: 0 }}>"{s.intention}"</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: C.textLt, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>TOPICS COVERED</div>
                {s.topics.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal, marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.textMd, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.textLt, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>KEY INSIGHT</div>
                <div style={{ background: C.clayLt, borderRadius: 10, padding: "12px 14px" }}>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>{s.keyInsight}</p>
                </div>
              </div>
            </div>
          </Card>
          {isCoach && (
            <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.clay}` }}>
              <div style={{ fontSize: 11, color: C.clay, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>COACH NOTES</div>
              <p style={{ fontSize: 13, color: C.textMd, lineHeight: 1.7, margin: 0 }}>{s.notes}</p>
            </Card>
          )}
          <Card>
            <div style={{ fontSize: 12, color: C.textLt, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 14 }}>HOMEWORK ASSIGNED</div>
            {s.homework.map(hw => (
              <div key={hw.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, opacity: hw.done ? 0.7 : 1 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  background: hw.done ? C.teal : "transparent",
                  border: `1.5px solid ${hw.done ? C.teal : C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {hw.done && <span style={{ color: "white", fontSize: 11 }}>✓</span>}
                </div>
                <span style={{ fontSize: 13, color: hw.done ? C.textLt : C.text, textDecoration: hw.done ? "line-through" : "none", lineHeight: 1.5 }}>{hw.text}</span>
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}

// ── HOMEWORK TRACKER ──────────────────────────────────────────────────────────

function HomeworkView() {
  const [checked, setChecked] = useState(() => {
    const all = {};
    SESSIONS.forEach(s => s.homework.forEach(h => { all[h.id] = h.done; }));
    return all;
  });

  const current = SESSIONS[SESSIONS.length - 1];
  const open = current.homework.filter(h => !checked[h.id]);
  const done = current.homework.filter(h => checked[h.id]);
  const allSessions = SESSIONS.slice(0, -1);
  const allPrevOpen = allSessions.flatMap(s => s.homework.filter(h => !checked[h.id]));

  function toggle(id) { setChecked(p => ({ ...p, [id]: !p[id] })); }

  return (
    <div>
      <SectionTitle sub="Track what's assigned, in progress, and done">Homework Tracker</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Open", value: open.length + allPrevOpen.length, color: C.clay },
          { label: "Completed This Session", value: done.length, color: C.teal },
          { label: "Sessions Complete", value: SESSIONS.length, color: C.sage },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: "16px 12px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textLt, marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Session {current.num} — Current</div>
            <div style={{ fontSize: 12, color: C.textLt }}>{current.date}</div>
          </div>
          <Tag color={open.length > 0 ? C.clay : C.teal}>{open.length > 0 ? `${open.length} open` : "all done ✓"}</Tag>
        </div>
        {current.homework.map(hw => (
          <div key={hw.id} onClick={() => toggle(hw.id)} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, cursor: "pointer", padding: "8px 10px", borderRadius: 8, transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.warmDk}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
              background: checked[hw.id] ? C.teal : "transparent",
              border: `2px solid ${checked[hw.id] ? C.teal : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
            }}>
              {checked[hw.id] && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: checked[hw.id] ? C.textLt : C.text, textDecoration: checked[hw.id] ? "line-through" : "none", lineHeight: 1.5 }}>{hw.text}</span>
          </div>
        ))}
      </Card>

      {allPrevOpen.length > 0 && (
        <Card style={{ borderLeft: `3px solid ${C.clay}` }}>
          <div style={{ fontSize: 12, color: C.clay, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 12 }}>STILL OPEN FROM PREVIOUS SESSIONS</div>
          {allPrevOpen.map(hw => (
            <div key={hw.id} onClick={() => toggle(hw.id)} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8, cursor: "pointer", padding: "6px 8px", borderRadius: 8, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.warmDk}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                background: checked[hw.id] ? C.teal : "transparent",
                border: `2px solid ${checked[hw.id] ? C.teal : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {checked[hw.id] && <span style={{ color: "white", fontSize: 11 }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, color: checked[hw.id] ? C.textLt : C.textMd, textDecoration: checked[hw.id] ? "line-through" : "none", lineHeight: 1.5 }}>{hw.text}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ── DAILY PRACTICE ────────────────────────────────────────────────────────────

function DailyView() {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState(null);
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  const breathSteps = TOOLS.breathing.items[0].steps;
  const journalSteps = TOOLS.journaling.items[2].steps;
  const quietSteps = ["Find a comfortable seated position. Close your eyes.", "Option A — White Light Visualization: Imagine a powerful white light entering through the crown of your head, filling your body from head to toe.", "Option B — Five Senses Awareness: Notice what is cold, warm, sounds you hear near and far, any unusual feeling or sensation. Just observe.", "Stay here for 15 minutes. When thoughts arise, gently return to the light or your senses."];

  const details = { dp1: breathSteps, dp2: journalSteps, dp3: quietSteps };

  return (
    <div>
      <SectionTitle sub="Your 30-minute daily practice — Session 4 onward">Daily Practice</SectionTitle>
      <div style={{ background: `linear-gradient(135deg, ${C.teal}15, ${C.sage}10)`, border: `1px solid ${C.tealLt}`, borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.tealDk }}>Today's Practice</div>
          <div style={{ fontSize: 13, color: C.textMd, marginTop: 2 }}>{doneCount} of {DAILY_PRACTICE.length} complete · 30 minutes total</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {DAILY_PRACTICE.map(p => (
            <div key={p.id} style={{ width: 28, height: 28, borderRadius: "50%", background: checked[p.id] ? C.teal : C.tealXlt, border: `2px solid ${checked[p.id] ? C.teal : C.tealLt}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
              {checked[p.id] ? "✓" : p.icon}
            </div>
          ))}
        </div>
      </div>

      {DAILY_PRACTICE.map(p => (
        <Card key={p.id} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div onClick={() => toggle(p.id)} style={{
              width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 1, cursor: "pointer",
              background: checked[p.id] ? C.teal : "transparent",
              border: `2px solid ${checked[p.id] ? C.teal : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
            }}>
              {checked[p.id] && <span style={{ color: "white", fontSize: 13 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontSize: 18 }}>{p.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: checked[p.id] ? C.textLt : C.text }}>{p.label}</span>
                    <Tag color={C.teal}>{p.time}</Tag>
                  </div>
                  <p style={{ fontSize: 13, color: C.textMd, margin: 0, lineHeight: 1.5 }}>{p.detail}</p>
                </div>
                <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{
                  background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 12px",
                  fontSize: 12, color: C.textMd, cursor: "pointer", whiteSpace: "nowrap", marginLeft: 12,
                  transition: "all 0.15s",
                }}>{expanded === p.id ? "hide" : "how-to"}</button>
              </div>
              {expanded === p.id && (
                <div style={{ marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                  {details[p.id].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.tealXlt, color: C.teal, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontSize: 13, color: C.textMd, lineHeight: 1.6 }}>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}

      <Card style={{ background: C.tealXlt, border: `1px solid ${C.tealLt}`, marginTop: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, letterSpacing: "0.06em", marginBottom: 8 }}>GENERATOR REMINDER</div>
        <p style={{ fontSize: 13, color: C.tealDk, lineHeight: 1.6, margin: 0 }}>
          Your strategy is to <strong>respond</strong>, not initiate. If you're feeling frustrated or depleted right now, check: did you initiate that situation, or did you respond to something? Return to practices that feel like a natural "yes" — not the ones you think you should do.
        </p>
      </Card>
    </div>
  );
}

// ── AI CHAT ───────────────────────────────────────────────────────────────────

function ChatView({ isCoach }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: isCoach
        ? "Hi Neysha 👋 I'm ready to help you prepare for or debrief from a session with Kelly. You can ask me to summarize patterns, draft a check-in message, suggest next homework, or analyze where she is in the program. What do you need?"
        : "Hi Kelly! I'm your YouX AI Coach. I know your program, your sessions with Neysha, and all the tools we've covered together. I'm here to help you with whatever you're facing right now — whether that's a breathing practice, working through a situation using cognitive defusion, figuring out what homework to tackle next, or just thinking something through. What's on your mind?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: isCoach ? COACH_SYSTEM_PROMPT : SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "I'm here — try asking again.";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  const quickPrompts = isCoach
    ? ["Summarize Kelly's patterns across all sessions", "What homework should I assign next?", "Draft a check-in message for Kelly", "What tools has Kelly been using?"]
    : ["What should I work on today?", "Guide me through box breathing", "Help me use cognitive defusion right now", "I'm feeling overwhelmed — what do I do?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
      <SectionTitle sub={isCoach ? "Your coaching intelligence assistant" : "Your YouX AI Coach — knows your program, tools, and sessions"}>
        {isCoach ? "Coach AI Assistant" : "AI Coach"}
      </SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {quickPrompts.map(p => (
          <button key={p} onClick={() => { setInput(p); }} style={{
            background: C.tealXlt, border: `1px solid ${C.tealLt}`, borderRadius: 20,
            padding: "6px 14px", fontSize: 12, color: C.tealDk, cursor: "pointer", transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = C.white; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.tealXlt; e.currentTarget.style.color = C.tealDk; }}
          >{p}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.role === "user" ? C.teal : C.white,
              color: m.role === "user" ? C.white : C.text,
              fontSize: 14, lineHeight: 1.65, boxShadow: C.shadow,
              border: m.role === "assistant" ? `1px solid ${C.border}` : "none",
              whiteSpace: "pre-wrap",
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "12px 16px", borderRadius: "14px 14px 14px 4px", background: C.white, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.tealLt, animation: `bounce 0.9s ${i * 0.15}s infinite` }} />
                ))}
              </div>
              <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 10, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder={isCoach ? "Ask about Kelly's progress, patterns, next steps..." : "What's on your mind? Ask for a tool, guidance, or support..."}
          style={{
            flex: 1, padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${C.border}`,
            fontSize: 14, outline: "none", color: C.text, background: C.white,
            transition: "border-color 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = C.teal}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{
          background: input.trim() && !loading ? C.teal : C.tealLt, border: "none", borderRadius: 12,
          padding: "12px 20px", color: C.white, fontSize: 14, fontWeight: 600, cursor: input.trim() && !loading ? "pointer" : "default", transition: "all 0.15s",
        }}>Send</button>
      </div>
    </div>
  );
}

// ── COACH OVERVIEW ────────────────────────────────────────────────────────────

function CoachOverview() {
  return (
    <div>
      <SectionTitle sub="Kelly Hagen Kasai — Unleashed: The YouX Experience">Client Overview</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Sessions Complete", value: "4 of 6+", color: C.teal },
          { label: "Open Homework Items", value: "5", color: C.clay },
          { label: "Current Phase", value: "Dreams & Vision", color: C.sage },
          { label: "Human Design", value: "Generator", color: C.tealDk },
        ].map(s => (
          <Card key={s.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
            <div style={{ width: 4, height: 40, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: C.textLt }}>{s.label}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.clay}` }}>
        <div style={{ fontSize: 12, color: C.clay, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>RECURRING PATTERN TO TRACK</div>
        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>
          Kelly's recurring pattern: <strong>"Why does this always happen? Why am I initially treated as important, then excluded or forgotten?"</strong> — surfaced in the work launch event (Session 4) and earlier sessions. Appears connected to professional identity and self-worth. Irritation toward 2 founders still unresolved and recurring. This is the thread to pull in Session 5.
        </p>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: C.textLt, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>WHAT'S WORKING</div>
        {["Applied cognitive defusion in a real-world work situation (Session 4 — strong growth marker)", "Consistent attendance all 4 sessions", "Daily practice structure established (5+10+15 format)", "Self-awareness is high — notices patterns as they happen"].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <span style={{ color: C.teal, fontSize: 13 }}>✓</span>
            <span style={{ fontSize: 13, color: C.textMd }}>{s}</span>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontSize: 12, color: C.textLt, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>SUGGESTED FOCUS FOR SESSION 5</div>
        {["Debrief vision board and dream day homework", "Explore origin of the exclusion/forgotten pattern — childhood? Past business?", "Introduce: Transmuting Negative Emotions workbook (IEMT) applied to the exclusion pattern", "Reinforce Generator strategy — is she initiating at work vs. responding?"].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.tealXlt, color: C.teal, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: C.textMd }}>{s}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState("client");
  const [tab, setTab] = useState("sessions");
  const isCoach = role === "coach";

  const clientTabs = [
    { id: "sessions", label: "Sessions", icon: "📋" },
    { id: "homework", label: "Homework", icon: "✅" },
    { id: "daily", label: "Daily Practice", icon: "🌱" },
    { id: "chat", label: "AI Coach", icon: "💬" },
  ];
  const coachTabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "sessions", label: "Sessions", icon: "📋" },
    { id: "chat", label: "AI Assistant", icon: "🤖" },
  ];
  const tabs = isCoach ? coachTabs : clientTabs;

  function renderContent() {
    if (tab === "sessions") return <SessionsView isCoach={isCoach} />;
    if (tab === "homework") return <HomeworkView />;
    if (tab === "daily") return <DailyView />;
    if (tab === "chat") return <ChatView isCoach={isCoach} />;
    if (tab === "overview") return <CoachOverview />;
  }

  function switchRole(r) {
    setRole(r);
    setTab(r === "coach" ? "overview" : "sessions");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.warm, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 28px", boxShadow: "0 1px 8px rgba(45,58,53,0.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.sage})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌿</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.text, letterSpacing: "-0.01em" }}>YouX Experience</div>
              <div style={{ fontSize: 11, color: C.textLt }}>{isCoach ? "Coach Console · Neysha Arcelay" : "Client Portal · Kelly Hagen Kasai"}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 2, background: C.warmDk, borderRadius: 10, padding: 3 }}>
            {[["client", "Client"], ["coach", "Coach"]].map(([r, l]) => (
              <button key={r} onClick={() => switchRole(r)} style={{
                padding: "5px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none",
                background: role === r ? C.white : "transparent",
                color: role === r ? C.teal : C.textLt,
                cursor: "pointer", transition: "all 0.15s",
                boxShadow: role === r ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 28px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "14px 18px", fontSize: 13, fontWeight: 600, border: "none", background: "none",
              color: tab === t.id ? C.teal : C.textLt,
              borderBottom: `2px solid ${tab === t.id ? C.teal : "transparent"}`,
              cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div style={{ paddingBottom: 40 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
