// Shared scenario content — DEEP version
// Each module now has:
//   - contentNote: what's ahead + why, with opt-out acknowledgement
//   - longer vignettes (4-7 exchanges, multi-scene in some)
//   - multi-step branching: Step 1 choice → consequence beat → Step 2
//     follow-up choice → consolidated reflection → research → commitment
//   - optional "heavier" flag that surfaces an extra warning

const GRADE_BAND = {
  k2: { label: "K-2", ageHint: "5-8 year olds" },
  g35: { label: "3-5", ageHint: "8-11 year olds" },
  all: { label: "K-5", ageHint: "elementary" },
};

// Helper: each choice has { label, tag, feedback, next } where next is an
// optional key into the module's step2 map that determines the follow-up.
// If a choice has no `next`, step2 still runs via a default follow-up.

const SCENARIOS = [
  // ─────────────────────────────────────────────────────────────
  // 01 · Discipline referral
  // ─────────────────────────────────────────────────────────────
  {
    id: "s01",
    category: "Discipline & behavior referrals",
    title: "The 'disruptive' reader",
    time: "8 min",
    color: "#b85c3e",
    heavier: true,
    contentNote: {
      heading: "Before you begin",
      body: "This module involves a colleague pressuring you to write up a Black student for a low-level behavior. It asks you to practice interrupting a referral pipeline in real time. If you're holding a hard day, come back later — this one benefits from a clear head."
    },
    setup: {
      k2: "It's 10:14 on a Tuesday. Independent reading. Marcus — one of three Black boys in your 2nd grade class — is tapping his pencil. You've asked him twice to stop. A colleague covering your prep walks in, glances over, and leans in.",
      g35: "It's 10:14 on a Tuesday. Independent reading. Marcus — one of three Black boys in your 4th grade class — is tapping his pencil. You've asked him twice to stop. A colleague covering your prep walks in, glances over, and leans in.",
      all: "It's 10:14 on a Tuesday. Independent reading. Marcus — one of three Black boys in your class — is tapping his pencil. You've asked him twice to stop. A colleague covering your prep walks in, glances over, and leans in."
    },
    vignette: {
      label: "Scene 1 · Vignette · 0:47",
      transcript: [
        { who: "Colleague", line: "That's the third time this week with him, right?" },
        { who: "You", line: "He's just tapping his pencil. I've asked him to stop." },
        { who: "Colleague", line: "I'd write him up. They have to learn consequences. You're too soft with him." },
        { who: "Marcus", line: "[stops tapping, looks down at his book, flips the page too fast]" },
        { who: "Colleague", line: "See? Now he's not even reading. You going to let that slide?" },
      ]
    },
    prompt: "Your colleague is waiting. Marcus is watching. What's the first move?",
    choices: [
      { label: "Write the referral — consistency matters",
        tag: "pause",
        feedback: "Consistency in what, exactly? The pencil-tapping, or the pattern of writing up Black boys for it? Research on referral patterns: Black students are referred for 'subjective' infractions (disruption, defiance, disrespect) at 2-3x the rate of white peers for identical behaviors.",
        next: "afterReferral" },
      { label: "Ask your colleague: 'What specifically did Marcus do that a white student wouldn't have been written up for?'",
        tag: "reframe",
        feedback: "This is the interrupt. It doesn't accuse; it invites your colleague — and you — to separate behavior from perception. Bias lives in the gap between the two.",
        next: "afterPush" },
      { label: "Move Marcus quietly to a different table",
        tag: "consider",
        feedback: "Buys calm, but doesn't address the frame your colleague just put on Marcus in front of everyone — including Marcus. Worth pairing with a private follow-up.",
        next: "afterMove" },
      { label: "I'm not sure yet — I need a beat",
        tag: "consider",
        feedback: "'Not sure' is honest and useful. Slow moments are where bias has the least power. Notice: what did you feel in your body when your colleague said 'you're too soft with him'?",
        next: "afterPause" }
    ],
    step2: {
      afterReferral: {
        label: "Scene 2 · Later that afternoon",
        beat: "You wrote the referral. Marcus's mom calls at 4:15. She's not angry — she's tired. 'This is the fourth one this year,' she says. 'He doesn't do this at home. What are you all seeing that I'm not?'",
        prompt: "What do you say?",
        choices: [
          { label: "List the infractions factually and defend the decision",
            tag: "pause",
            feedback: "Factual ≠ complete. The pattern she's naming — four referrals, one child, one year — is data you're inside of and she's outside of. Her question deserves your curiosity, not your defense." },
          { label: "Tell her you'll pull the four referrals, look at them together, and call her Friday",
            tag: "reframe",
            feedback: "Buying time here is not a stall — it's a real audit. You may find that three of the four were written by two specific colleagues for 'disruption.' That's a pattern about the adults, not Marcus." },
          { label: "Apologize and withdraw today's referral",
            tag: "consider",
            feedback: "Sometimes the right move. But the pipeline that produced it is still there tomorrow. Repair the single instance and the system that made it." }
        ]
      },
      afterPush: {
        label: "Scene 2 · The colleague pushes back",
        beat: "Your colleague's face tightens. 'Wow. I'm just trying to help you. I didn't realize asking about a disruptive kid was racist now.' She's about to walk out.",
        prompt: "What do you say as she's leaving?",
        choices: [
          { label: "Back off and apologize — you don't want her telling people you called her racist",
            tag: "pause",
            feedback: "The 'you called me racist' deflection is one of the most common ways bias interrupts get shut down. You didn't call her anything. You asked a question. The shape of the pushback is itself information." },
          { label: "'I didn't say that. I'm asking because I'm also trying to be careful here. Sit with me for five minutes after school?'",
            tag: "reframe",
            feedback: "Low-temperature, high-invite. You held the question, named your own uncertainty, and offered a real conversation. This is the harder skill than the initial interrupt." },
          { label: "'Fair. Let me think about it and come find you.'",
            tag: "consider",
            feedback: "Buys peace, but the referral conversation is still live. If you don't come find her, she writes the story. Make sure you actually go." }
        ]
      },
      afterMove: {
        label: "Scene 2 · End of the day",
        beat: "Marcus has been extra quiet since the table move. At dismissal, he lingers. 'Am I in trouble?' he asks. 'Ms. ___ said I was.'",
        prompt: "What do you say to Marcus?",
        choices: [
          { label: "'You're not in trouble. She was giving me advice; she wasn't right.'",
            tag: "reframe",
            feedback: "Eight-year-olds can hold the truth that adults disagree. Naming it without trashing the colleague teaches Marcus that the grown-ups in the building are accountable to him." },
          { label: "'You're not in trouble — but let's talk about the pencil-tapping tomorrow.'",
            tag: "consider",
            feedback: "Fine, but it dodges what he heard. He heard an adult call him a problem. That part deserves a response." },
          { label: "'She was just being a teacher. Read tonight, buddy.'",
            tag: "pause",
            feedback: "He'll remember this. Minimizing what he heard teaches him not to trust his own ears — a lesson students of color learn too early and too often." }
        ]
      },
      afterPause: {
        label: "Scene 2 · Two minutes of silence",
        beat: "You said 'let me think' and your colleague huffed out. Now you have a class of 22 watching you and a pencil-tapping kid who knows something just happened.",
        prompt: "Your next move in the classroom?",
        choices: [
          { label: "Go back to the read-aloud and deal with the colleague later",
            tag: "consider",
            feedback: "Reasonable. The kids need the lesson. But Marcus heard 'too soft with him' and he's watching your face. Name something gentle to him if you can." },
          { label: "Make eye contact with Marcus, half-smile, keep teaching",
            tag: "reframe",
            feedback: "Tiny, repairing, non-performative. You told him without words: we're fine. That's often what 8-year-olds need most." },
          { label: "Call Marcus over and check in privately",
            tag: "consider",
            feedback: "Well-meaning but risks making him the center of a scene he didn't start. The brief eye-contact repair often does more." }
        ]
      }
    },
    research: {
      quote: "Black children represent 18% of preschool enrollment but 48% of preschool children receiving more than one out-of-school suspension.",
      cite: "U.S. Dept. of Education, Office for Civil Rights (CRDC)"
    },
    commitment: "Next time a colleague suggests a referral, I will ask ______ before I agree — and if it's about one of the same three students, I will ______."
  },

  // ─────────────────────────────────────────────────────────────
  // 02 · Classroom participation
  // ─────────────────────────────────────────────────────────────
  {
    id: "s02",
    category: "Classroom participation",
    title: "Who gets called on",
    time: "7 min",
    color: "#6b7a5a",
    contentNote: {
      heading: "Before you begin",
      body: "You're going to look at data you collected on yourself. That can feel exposing. Remember: the data isn't a verdict, it's a mirror. Mirrors are useful."
    },
    setup: {
      all: "You agreed to self-audit for a week: tally marks on a clipboard every time you called on a student during morning meeting. You didn't tell the class. The tallies surprised you."
    },
    vignette: {
      label: "Scene 1 · Your tallies, one week",
      transcript: [
        { who: "Students of color (n=8)", line: "Hands up: 22  ·  Called on: 4" },
        { who: "White students (n=12)", line: "Hands up: 18  ·  Called on: 15" },
        { who: "Your margin note, Wed", line: "\"J. didn't have hand up; called on him anyway. Good answer.\"" },
        { who: "Your margin note, Thu", line: "\"Amara's hand up for 3 questions in a row. Didn't call. Why?\"" },
        { who: "Your margin note, Fri", line: "\"Just realized I keep calling on Tyler because his answer moves us forward.\"" }
      ]
    },
    prompt: "You have the data. What's the first move?",
    choices: [
      { label: "Introduce a random-caller (popsicle sticks, app) Monday",
        tag: "reframe",
        feedback: "Strong. Structural fixes outperform willpower. Random calling removes the split-second 'who feels ready' judgment that tends to track bias.",
        next: "afterStructure" },
      { label: "Set an internal intention to call on students of color more",
        tag: "consider",
        feedback: "Willpower-based fixes fade by Wednesday. Pair the intention with a structure.",
        next: "afterIntention" },
      { label: "Conclude the sample is too small to matter",
        tag: "pause",
        feedback: "The pattern is a signal, not a verdict. Dismissing data you collected on yourself is worth noticing — what does the dismissal protect?",
        next: "afterDismiss" },
      { label: "Tell the class you're working on this and ask for their help",
        tag: "reframe",
        feedback: "Vulnerable and effective. Eight-year-olds understand fairness; naming it models the repair you want them to practice.",
        next: "afterTellClass" }
    ],
    step2: {
      afterStructure: {
        label: "Scene 2 · Monday, period 1",
        beat: "You pull sticks. The first name is Amara. She freezes. 'I didn't have my hand up,' she says, quietly. A couple of kids laugh.",
        prompt: "What do you do in the next 10 seconds?",
        choices: [
          { label: "'That's okay — let me hear your thinking, even if you're not sure.'",
            tag: "reframe",
            feedback: "Names the new norm. Cold-calling works when it comes with safety — permission to say 'I'm thinking about it' is as valid an answer as the right one." },
          { label: "Put the stick back, pull another name",
            tag: "pause",
            feedback: "This is the old pattern with a new tool. Notice: Amara now knows the sticks skip her. You just taught the class who's 'real' cold-call material." },
          { label: "'Say the first thing — even if it's \"I'm still working on it.\" That counts.'",
            tag: "reframe",
            feedback: "Excellent. 'Still working on it' is a participation move, not a non-answer. This reframing of what counts changes who can participate." }
        ]
      },
      afterIntention: {
        label: "Scene 2 · Friday, end of week",
        beat: "You tally again. Students of color: 19 hands up, 7 called on. Better. But you notice you called on Jada three of those seven times — and only asked her the 'describe what you see' softball question each time.",
        prompt: "What do you notice?",
        choices: [
          { label: "Progress is progress — seven is more than four",
            tag: "consider",
            feedback: "True and incomplete. Counting call-ons is one lens. The *type* of question matters almost as much. Softball questions perform inclusion without risking getting a real answer." },
          { label: "The question quality is the next layer — who gets asked to synthesize?",
            tag: "reframe",
            feedback: "This is the deeper cut. Research: when teachers increase call-ons to students of color without changing question difficulty, engagement doesn't shift. When both change, it does." },
          { label: "I should spread Jada's three call-ons across more kids",
            tag: "consider",
            feedback: "Yes — and ask yourself who 'felt safe' to call on. Usually we overuse the students we've decided are 'the ones who'll try.' Safety for us isn't the same as equity for them." }
        ]
      },
      afterDismiss: {
        label: "Scene 2 · Two weeks later",
        beat: "You didn't change anything. A parent emails: 'My daughter says she's given up raising her hand. Is she participating?' You look back at your clipboard, unused since that Friday.",
        prompt: "What do you write back?",
        choices: [
          { label: "Reassure the parent she participates in other ways",
            tag: "pause",
            feedback: "This is the letter that keeps the pipeline running. 'She participates in other ways' is often code for 'I don't see her participating and I'm not changing anything.' Her daughter noticed. Now her mom has." },
          { label: "Call the parent. Tell her what you noticed in your own tally. Tell her what you're going to do this week.",
            tag: "reframe",
            feedback: "Vulnerable. And the right move. The parent just gave you a second chance at the audit you buried two weeks ago." },
          { label: "Start the sticks tomorrow, reply to the parent Friday with what changed",
            tag: "reframe",
            feedback: "Action first, accountability next. Both are necessary." }
        ]
      },
      afterTellClass: {
        label: "Scene 2 · Monday morning meeting",
        beat: "You tell the kids. 'I noticed I've been calling on some of you more than others, and it's not fair. I'm going to try something new. You can tell me if I mess up.' Tyler — who has been called on 15 times — raises his hand. 'So I'll get called on less?'",
        prompt: "What do you say to Tyler?",
        choices: [
          { label: "'Probably. And I think you're going to do great.'",
            tag: "reframe",
            feedback: "Warm, direct, no over-explaining. Tyler's question is honest; kids understand when the math shifts. Don't soften it into meaninglessness." },
          { label: "'Everyone is going to get called on the same amount.'",
            tag: "consider",
            feedback: "True on average, but Tyler's sharp — he just did the math. Honoring that he'll get called on less often, and that that's fair, is the lesson." },
          { label: "'Tyler, this isn't about you.'",
            tag: "pause",
            feedback: "It is, a little, and that's fine. Making it 'not about him' teaches kids who've been over-called-on that redistribution is a loss rather than a rebalance." }
        ]
      }
    },
    research: {
      quote: "Teachers call on boys in class 80% more often than girls, and white students more often than students of color — even when they believe they call on everyone equally.",
      cite: "Sadker & Zittleman, 'Still Failing at Fairness'"
    },
    commitment: "This week I will track ______ and share the data with ______ by ______ (date)."
  },

  // ─────────────────────────────────────────────────────────────
  // 03 · Staff lounge
  // ─────────────────────────────────────────────────────────────
  {
    id: "s03",
    category: "Staff lounge conversations",
    title: "'That family, though'",
    time: "7 min",
    color: "#8a6a3a",
    contentNote: {
      heading: "Before you begin",
      body: "This module rehearses interrupting adults, which many of us were never taught. You'll see three phrasings; none are perfect. The goal is repertoire, not scripts."
    },
    setup: {
      all: "Wednesday lunch. Five teachers in the staff lounge. A veteran teacher — well-liked, a union rep, someone who's helped you before — sighs over coffee and starts in on next year's class lists."
    },
    vignette: {
      label: "Scene 1 · Staff lounge · overheard",
      transcript: [
        { who: "Veteran teacher", line: "You got the class list yet? You're getting the Ortega kid." },
        { who: "You", line: "I haven't looked yet." },
        { who: "Veteran teacher", line: "Well, brace yourself. That family, though — good luck getting Mom to show up. I sent three emails last year. Nothing." },
        { who: "Colleague", line: "[laughs] You'll be doing translation, tutoring, and social work all at once." },
        { who: "Veteran teacher", line: "And the kid's fine, honestly. It's the mom. Doesn't care." }
      ]
    },
    prompt: "The moment passes fast. What do you do?",
    choices: [
      { label: "Stay quiet — you're still new and don't want to make waves",
        tag: "pause",
        feedback: "Silence reads as agreement to the colleague who said it and to anyone else listening — especially the newer teachers at the table. You don't have to perform outrage; you do have to interrupt the story.",
        next: "afterSilent" },
      { label: "'I haven't met them yet — I'd rather start fresh.'",
        tag: "reframe",
        feedback: "Low-stakes, high-signal. You protected the child's reputation without lecturing. This kind of quiet interrupt is repeatable.",
        next: "afterMild" },
      { label: "'What's been hard about connecting with Mom? Anything that worked?'",
        tag: "reframe",
        feedback: "Redirects gossip into practice. Also surfaces whether the teacher tried Spanish outreach, evening hours, a home visit — information you actually need.",
        next: "afterCurious" },
      { label: "'I get that you're frustrated, but \"doesn't care\" is a lot.'",
        tag: "reframe",
        feedback: "More direct. Riskier. Also: sometimes the directness is what breaks the loop. Depends on the relationship.",
        next: "afterDirect" }
    ],
    step2: {
      afterSilent: {
        label: "Scene 2 · Two weeks later · open house",
        beat: "Mrs. Ortega arrives at open house. She's carrying a toddler, apologizing for being late. She works two shifts. She speaks fluent English; her first email last year was in Spanish and no one replied. The kid's name is Ernesto.",
        prompt: "What's the first thing you say?",
        choices: [
          { label: "'So glad you came. Tell me about Ernesto — what does he love?'",
            tag: "reframe",
            feedback: "You started with her knowledge, not your agenda. The staff-lounge frame had already taught you to expect a 'problem parent.' She's not one. The frame was the problem." },
          { label: "Explain the curriculum and the year ahead",
            tag: "consider",
            feedback: "Standard open-house. But you have ten minutes; use the first two to learn from her, not perform for her." },
          { label: "'I heard you had trouble reaching the school last year — I want to fix that.'",
            tag: "reframe",
            feedback: "Names the crack in the system without blaming her or a colleague. Repairing before there's a rupture is the cheapest repair there is." }
        ]
      },
      afterMild: {
        label: "Scene 2 · In the hallway · 10 minutes later",
        beat: "The veteran teacher catches up with you. 'Hey — look, I wasn't trying to trash them. I was giving you a heads up.' She seems a little defensive, a little genuine.",
        prompt: "What do you say?",
        choices: [
          { label: "'Totally — I just wanted to start blank. No shade.'",
            tag: "consider",
            feedback: "Keeps the peace, loses the thread. If you bank this small win and never come back to it, next August she'll say the same thing to the new hire." },
          { label: "'Heads ups help — tell me what worked, not what didn't. What did the kid love last year?'",
            tag: "reframe",
            feedback: "Reframes 'heads up' from warning to handoff. Asset-based. Makes her a better colleague without lecturing her." },
          { label: "'Honest question: have you ever had a Spanish-speaking colleague call Mom in Spanish?'",
            tag: "reframe",
            feedback: "Specific, practical, not personal. It surfaces a likely gap in her outreach without making it a character indictment." }
        ]
      },
      afterCurious: {
        label: "Scene 2 · She answers",
        beat: "'I mean, I emailed her in English. Three times. She didn't reply.' Another teacher chimes in: 'Does she even speak English?'",
        prompt: "What now?",
        choices: [
          { label: "'Her intake form says Spanish is her first language. Mind if I try the front office's translation line?'",
            tag: "reframe",
            feedback: "You named a structural fix in front of the group without moralizing. Now the translation line is 'a thing people do,' not a favor to one family." },
          { label: "'Well, if she can't reply in English, that's on her.'",
            tag: "pause",
            feedback: "This is the sentence that closes the pipeline. 'That's on her' is the grown-up version of 'she doesn't care' — it just sounds more reasonable. Notice who it protects." },
          { label: "Redirect: 'Anyway — what were you saying about the new math kits?'",
            tag: "consider",
            feedback: "You ended the conversation, which is sometimes right. But the family is still 'that family' in the staff lounge tomorrow. Pick your moment to come back to it." }
        ]
      },
      afterDirect: {
        label: "Scene 2 · The air changes",
        beat: "The table goes quiet for a beat. The veteran teacher looks at you. 'Okay, I'll bite. What would you have said?'",
        prompt: "She's genuinely asking. What do you say?",
        choices: [
          { label: "'Honestly — \"hard to reach\" is a thing I'd say. \"Doesn't care\" is a story. I try to stay with the first one.'",
            tag: "reframe",
            feedback: "Precise. Generous. You offered language she can use. That's the whole point — not shaming her, but giving her a better sentence for next time." },
          { label: "'I don't know, I just didn't like it.'",
            tag: "pause",
            feedback: "Understandable — and a missed opportunity. If you can name *what* about it was off, you hand her a tool. 'I just didn't like it' invites her to dismiss you." },
          { label: "'I'd ask what kept her from showing up — not whether she cared.'",
            tag: "reframe",
            feedback: "Behavior vs. character. One is observable; the other is a story. This is the core move." }
        ]
      }
    },
    research: {
      quote: "Deficit framing of families of color — 'they don't care,' 'they won't show up' — is the single strongest predictor of low teacher expectations.",
      cite: "Zaretta Hammond, Culturally Responsive Teaching & the Brain"
    },
    commitment: "The next time a colleague frames a family as a problem, I will say ______ in the moment, and follow up with ______ later."
  },

  // ─────────────────────────────────────────────────────────────
  // 04 · Conferences
  // ─────────────────────────────────────────────────────────────
  {
    id: "s04",
    category: "Parent-teacher conferences",
    title: "Before Mr. Nguyen arrives",
    time: "7 min",
    color: "#3a5a6b",
    contentNote: {
      heading: "Before you begin",
      body: "This module surfaces a pattern most teachers find uncomfortable in themselves: the 'easy' kid whose file is thin. Being uncomfortable is the data."
    },
    setup: {
      all: "Conferences start in ten minutes. You're flipping through your notes folder. You pause at two in a row."
    },
    vignette: {
      label: "Scene 1 · Conference prep · your own notes",
      transcript: [
        { who: "Kai Nguyen", line: "\"Quiet. Sweet. Follows directions. On grade level.\"" },
        { who: "Sofia Reyes", line: "\"Curious reader, loves Greek myths, needs stretch on fractions, best friend Amira, mom asked about chess club, gets stuck on multi-step word problems.\"" },
        { who: "Aiden Walsh", line: "\"Strong writer, needs push on revision, parents divorcing — check in gently, loves playing Warriors at recess.\"" },
        { who: "Jayden Banks", line: "\"Good kid.\"" },
        { who: "Margin note", line: "How do I have four sentences on Sofia and four words on Jayden? I like Jayden." }
      ]
    },
    prompt: "Ten minutes until Mr. Nguyen arrives. What are you doing in those ten minutes?",
    choices: [
      { label: "Stay with Kai — pull his work samples and find three specifics to name",
        tag: "reframe",
        feedback: "Yes. Specificity is the opposite of stereotype. 'He's such a good kid' tells Mr. Nguyen nothing his son doesn't already hear.",
        next: "afterKai" },
      { label: "Assume the thin notes reflect reality — Kai's quiet, the notes match",
        tag: "pause",
        feedback: "Maybe. Also maybe the 'model minority' frame has made Kai easy to overlook. Quiet kids of any background should not be a data desert in your gradebook.",
        next: "afterAssume" },
      { label: "Focus on Jayden instead — that one's worse",
        tag: "consider",
        feedback: "Valid instinct. But Mr. Nguyen is the one in ten minutes. You can hold both — handle the immediate conference and plan a Jayden audit tonight.",
        next: "afterJayden" },
      { label: "Prepare one open question for Mr. Nguyen about what Kai is like at home",
        tag: "reframe",
        feedback: "Turns the conference from report to conversation. Families of color consistently report teachers tell them what's wrong and almost never ask what's strong at home.",
        next: "afterQuestion" }
    ],
    step2: {
      afterKai: {
        label: "Scene 2 · Mr. Nguyen arrives",
        beat: "You have: 'Kai's margin drawing of a dragon on 9/14 — detailed, sequential, suggests strong narrative planning.' 'Kai's self-correction in the math journal on 9/22.' 'Kai helped Marcus find his book on 9/28 without being asked.' Mr. Nguyen sits, folds his hands, waits.",
        prompt: "Your opening?",
        choices: [
          { label: "'Let me tell you three specific things Kai did this month.'",
            tag: "reframe",
            feedback: "Strong. You just replaced 'he's a good kid' with evidence. For a family accustomed to 'quiet, sweet, follows directions' — often the ceiling of what Asian American students hear — this lands differently." },
          { label: "'Kai is such a joy. No concerns at all.'",
            tag: "pause",
            feedback: "You did the prep. Don't default to the old sentence because it's comfortable. Say the specifics out loud." },
          { label: "'Before I share — what's Kai been talking about at home?'",
            tag: "reframe",
            feedback: "Opens with his expertise. Also a check: if he says 'he doesn't really talk about school,' that's data about how Kai feels in your room, not about his personality." }
        ]
      },
      afterAssume: {
        label: "Scene 2 · The conference happens",
        beat: "You say: 'Kai's a joy. Quiet, sweet, on grade level. No concerns.' Mr. Nguyen nods. Then, quietly: 'My wife and I were wondering — is he being challenged?'",
        prompt: "What do you say?",
        choices: [
          { label: "'He's at grade level. He seems fine.'",
            tag: "pause",
            feedback: "'Fine' is the ceiling model-minority frame builds. Mr. Nguyen just cracked open a question most Asian American parents have learned not to ask. Don't close it." },
          { label: "'Honestly? I don't have a strong answer. Give me a week and I'll come back to you with one.'",
            tag: "reframe",
            feedback: "Sometimes the most rigorous answer is 'I need to look harder.' It respects Kai and teaches you to look." },
          { label: "'Great question. Let's talk about what challenge could look like.'",
            tag: "reframe",
            feedback: "Takes Mr. Nguyen seriously as a partner, not a complainer. Challenge isn't the same as more work — this is the conversation that turns notes like yours into observations like Sofia's." }
        ]
      },
      afterJayden: {
        label: "Scene 2 · Still ten minutes",
        beat: "You're back to Kai's folder. Time's almost up.",
        prompt: "Last-minute move?",
        choices: [
          { label: "Grab Kai's last three work samples; look for something — anything — specific",
            tag: "reframe",
            feedback: "The 'something specific' bar is shockingly low and shockingly effective. One true observation beats five trait descriptors." },
          { label: "Wing it; you'll think of something",
            tag: "pause",
            feedback: "Winging it with Kai's dad is how 'quiet, sweet' becomes the whole story for the third year running. Don't." },
          { label: "Ask a colleague what they noticed about Kai this year",
            tag: "consider",
            feedback: "Good if you have time. The risk: their notes may be as thin as yours. Pair with your own look at his work." }
        ]
      },
      afterQuestion: {
        label: "Scene 2 · Mr. Nguyen answers",
        beat: "You open with: 'Before I share what I've seen — what's Kai like at home that I might not see at school?' He pauses. 'He builds these... enormous Lego cities. He plans them for weeks. I don't see that version of him in the school stuff he brings home.'",
        prompt: "How do you respond?",
        choices: [
          { label: "'That version of him isn't showing up in my room. I want to fix that — help me think about what to try.'",
            tag: "reframe",
            feedback: "Radical partnership. You just told a father his son isn't getting the room he needs, and asked him to help. That's the conference most families of color have never been invited into." },
          { label: "'Oh, he's a great listener in class!'",
            tag: "pause",
            feedback: "He's telling you his son has a planning mind you haven't seen. Pivoting to 'great listener' confirms his suspicion. Don't reassure — investigate." },
          { label: "'Tell me more about what the cities look like.'",
            tag: "reframe",
            feedback: "Stays with him. Gathers data. You can't translate home-Kai to school-Kai without knowing home-Kai first." }
        ]
      }
    },
    research: {
      quote: "Asian American students are disproportionately described by teachers in trait-based language ('sweet,' 'quiet') rather than skill-based language — a pattern that mirrors how girls are described versus boys.",
      cite: "Lee, 'Unraveling the Model Minority Stereotype'"
    },
    commitment: "For every student, my conference notes will include at least ______ specific observations — and for any student whose file is thin, I will ______ before the conference."
  },

  // ─────────────────────────────────────────────────────────────
  // 05 · Gifted referral
  // ─────────────────────────────────────────────────────────────
  {
    id: "s05",
    category: "Academic tracking & recommendations",
    title: "The gifted referral form",
    time: "8 min",
    color: "#6b4a6b",
    heavier: true,
    contentNote: {
      heading: "Before you begin",
      body: "You'll look at a list you've written in real life or one just like it. The point isn't guilt — it's repair. You can change the list."
    },
    setup: {
      all: "Gifted-program nominations due Friday. You've drafted eight names. You look at your class roster next to the list. Your class is 40% Black and Latino. Your list is 87% white."
    },
    vignette: {
      label: "Scene 1 · Your draft, 6pm Thursday",
      transcript: [
        { who: "On the list (8)", line: "Emma · Liam · Olivia · Noah · Ava · Sophia · Mason · Priya" },
        { who: "Crossed out earlier", line: "Jada (B) ← 'strong but not quite'" },
        { who: "Crossed out earlier", line: "Elián (L) ← 'strong but not quite'" },
        { who: "Also considered, not added", line: "DeShawn (B) ← 'inconsistent'" },
        { who: "Also considered, not added", line: "Amani (B) ← 'quiet, hard to read'" },
        { who: "Your margin note", line: "'Not quite there' — what do I actually mean?" }
      ]
    },
    prompt: "What does 'not quite there' mean, and what do you do about the list tonight?",
    choices: [
      { label: "Put Jada and Elián back on — if they were close, they're in",
        tag: "reframe",
        feedback: "Good. Research is unambiguous: Black and Latino students with identical test scores to white peers are 50%+ less likely to be nominated by teachers for gifted programs.",
        next: "afterAdd" },
      { label: "Ask a colleague to review the list with a bias lens before you submit",
        tag: "reframe",
        feedback: "A second pair of eyes is the cheapest bias check available. Pair with someone who'll push back, not nod.",
        next: "afterPeer" },
      { label: "Trust your gut — you know these students",
        tag: "pause",
        feedback: "Your gut is where bias lives most comfortably. 'Knowing your students' is exactly the faculty that makes teacher nominations the most biased filter in gifted-identification pipelines.",
        next: "afterGut" },
      { label: "Write down what 'not quite there' means for each crossed-out name — in skills, not vibes",
        tag: "reframe",
        feedback: "If you can't name the skill gap in a sentence, it isn't a skill gap — it's a feeling. This is one of the most powerful diagnostics you can run on yourself.",
        next: "afterNameIt" }
    ],
    step2: {
      afterAdd: {
        label: "Scene 2 · Now for the other two",
        beat: "Jada and Elián go back on. You look at DeShawn ('inconsistent') and Amani ('quiet, hard to read'). Your list is now eight; the form allows ten.",
        prompt: "DeShawn and Amani?",
        choices: [
          { label: "Add both — the cost of a false positive is small; the cost of a false negative is huge",
            tag: "reframe",
            feedback: "This is the right asymmetry to hold. A student wrongly nominated gets a screening. A student wrongly omitted gets a track." },
          { label: "Add DeShawn; leave Amani — 'quiet' isn't a gifted indicator",
            tag: "pause",
            feedback: "'Quiet' isn't a gifted indicator *and* it isn't a not-gifted indicator. For Black girls especially, 'quiet, hard to read' often means 'I haven't done the work to read her.' Add her and let the screening tell you." },
          { label: "Leave both; you've done enough tonight",
            tag: "consider",
            feedback: "You've done something. You haven't done enough. The list is asking for ten names; you have eight. Who are the other two?" }
        ]
      },
      afterPeer: {
        label: "Scene 2 · Friday morning, 7:30am",
        beat: "Ms. Delacroix reviews your list. She says: 'You're missing Amani. And — I'm going to say this gently — your crossed-out list is four students of color.' She's not angry; she's precise.",
        prompt: "What do you say?",
        choices: [
          { label: "'You're right. Walk me through what you're seeing in Amani.'",
            tag: "reframe",
            feedback: "You received a gift. Ms. Delacroix just saved a child's access. 'Walk me through' keeps the conversation in evidence, not shame." },
          { label: "'I considered all four and made judgments.'",
            tag: "pause",
            feedback: "Defensive. She didn't ask whether you considered; she's telling you what the *pattern* of your considerations looks like. Hear the pattern, not the implied accusation." },
          { label: "'Thank you. Can we look at all four together right now?'",
            tag: "reframe",
            feedback: "Best use of the 30 minutes before the form is due. Bring the list, her eyes, and the evidence folder." }
        ]
      },
      afterGut: {
        label: "Scene 2 · May · testing results come back",
        beat: "The gifted screening results arrive. Jada — the one you crossed off as 'not quite there' — tested into the 99th percentile. She'd have been the only Black girl in the program.",
        prompt: "What do you do with this?",
        choices: [
          { label: "Request a late add; write the nomination this week",
            tag: "reframe",
            feedback: "Good. The fix is not clean — she missed a year of enrichment — but it's real. And it's the first paragraph of the letter you write her parents." },
          { label: "Note it for next year's list",
            tag: "consider",
            feedback: "That's the *second* paragraph. The first is fixing it for Jada now." },
          { label: "Tell yourself the test caught it, so the system worked",
            tag: "pause",
            feedback: "The test caught her at 99th percentile *despite* you, not because of you. And half of districts don't have a test backstop. The system didn't work; a second filter did." }
        ]
      },
      afterNameIt: {
        label: "Scene 2 · You sit with the notebook",
        beat: "You write: 'Jada — not quite there because... she doesn't volunteer in whole-group.' 'Elián — not quite there because... his essays have grammar errors.' You stare at the page.",
        prompt: "What do you see?",
        choices: [
          { label: "Neither of those is about giftedness — they're about participation style and English learner status",
            tag: "reframe",
            feedback: "Exactly. 'Not quite there' was two stereotypes wearing a skill-language costume. Put them both on the list." },
          { label: "Those are still valid concerns",
            tag: "pause",
            feedback: "They're valid *observations*. They're not valid *gifted exclusion criteria*. The gifted program is not a 'confident, native-English-speaking' program. Or — it shouldn't be." },
          { label: "I need to write this down and bring it to the team",
            tag: "reframe",
            feedback: "One teacher's audit becomes a team practice. This is how gifted pipelines actually change." }
        ]
      }
    },
    research: {
      quote: "Black students are 54% less likely than white students with the same test scores to be recommended for gifted programs by their teachers.",
      cite: "Grissom & Redding, AERA Open, 2016"
    },
    commitment: "Before submitting any academic recommendation, I will ______ — and if my list skews, I will ______."
  },

  // ─────────────────────────────────────────────────────────────
  // 06 · SPED referral
  // ─────────────────────────────────────────────────────────────
  {
    id: "s06",
    category: "Special education referrals",
    title: "'Something's off' with DeShawn",
    time: "7 min",
    color: "#a04a3e",
    contentNote: {
      heading: "Before you begin",
      body: "Special education is a protective right. It is also, for Black boys, a pipeline. This module asks you to slow down in front of both facts at once."
    },
    setup: {
      all: "You're considering a referral for DeShawn. He's inconsistent — brilliant one day, shut down the next. A colleague says you're 'getting ahead of it.' You haven't yet called his mom."
    },
    vignette: {
      label: "Scene 1 · DeShawn · two weeks of observations",
      transcript: [
        { who: "Mon 9/11", line: "Solved the logic puzzle the whole class was stuck on. Helped two classmates." },
        { who: "Thu 9/14", line: "Head on desk. No work produced. Wouldn't talk to me." },
        { who: "Mon 9/18", line: "Wrote a three-page story about a detective. Beautiful dialogue." },
        { who: "Thu 9/21", line: "Refused morning meeting. Sat under the coat rack." },
        { who: "Fri 9/22", line: "Fine again. Wrote about the coat rack day in his journal — 'I was tired.'" }
      ]
    },
    prompt: "What do you do first?",
    choices: [
      { label: "Start the referral paperwork — better early than late",
        tag: "pause",
        feedback: "Black students are disproportionately referred for SPED under 'emotional disturbance' categories. The data you have — inconsistency — is not a disability signal. It's a signal you don't yet know the cause.",
        next: "afterPaperwork" },
      { label: "Call DeShawn's mom this week — ask what Thursdays look like at home",
        tag: "reframe",
        feedback: "Family is the first expert. You may learn DeShawn's father visits Wednesday nights, or that Thursdays are daycare pickup days. Context changes the whole question.",
        next: "afterMom" },
      { label: "Look for a Tier 1 cause before a clinical one — instruction, relationships, context",
        tag: "reframe",
        feedback: "The MTSS principle. Most 'referrals' actually resolve at Tier 1 once somebody slows down and looks.",
        next: "afterTier1" },
      { label: "Ask DeShawn what the hardest part of his day is",
        tag: "reframe",
        feedback: "Radical, underused. Eight-year-olds can often tell you exactly what's hard if they believe you'll listen without fixing.",
        next: "afterAsk" }
    ],
    step2: {
      afterPaperwork: {
        label: "Scene 2 · The draft referral",
        beat: "You've written: 'Inconsistent task completion, emotional dysregulation, possible mood disorder.' Your instructional coach reads it. She asks: 'What did DeShawn eat for breakfast on the days he had his head down?'",
        prompt: "What do you say?",
        choices: [
          { label: "'I don't know.'",
            tag: "reframe",
            feedback: "Correct. That's the whole point. The three variables most predictive of 'inconsistency' in second-graders — sleep, breakfast, weekend transitions — are almost never in our referral forms. They belong there." },
          { label: "'That's not relevant — the pattern is the pattern.'",
            tag: "pause",
            feedback: "The pattern is data. So is breakfast. Pretending one is rigorous and the other is soft is how Black boys end up with 'emotional disturbance' labels for being tired." },
          { label: "'Let me hold the referral and check.'",
            tag: "reframe",
            feedback: "The right move. Holding a referral isn't failing to refer; it's refusing to refer from a guess." }
        ]
      },
      afterMom: {
        label: "Scene 2 · The phone call",
        beat: "Ms. Banks picks up. You explain you want to understand DeShawn's week. She's quiet, then: 'His dad takes him every other Wednesday. He brings him back around 10pm. DeShawn's wiped Thursdays. I keep meaning to ask the school — should I write something?'",
        prompt: "What do you say?",
        choices: [
          { label: "'That is exactly the kind of thing I needed to know. Can we look at his work from those weeks together?'",
            tag: "reframe",
            feedback: "Partnership. You just turned 'possible SPED referral' into 'scheduling adjustment and a Thursday check-in.' Ms. Banks knew; no one asked." },
          { label: "'Okay — let me note that, and we'll see if the pattern continues.'",
            tag: "consider",
            feedback: "Better than nothing. But 'we'll see' often means 'the note gets buried.' Put the Thursday pattern in your planbook, not just your notes." },
          { label: "'That's helpful. We might still want to screen him — just to rule things out.'",
            tag: "pause",
            feedback: "'Just to rule things out' is how pipelines keep flowing. You got the actual cause. Don't default to clinical screening because you had it queued up." }
        ]
      },
      afterTier1: {
        label: "Scene 2 · Friday team meeting",
        beat: "You bring DeShawn to the grade-level team. You propose: 'Before a referral — two weeks of Thursday morning check-ins, a breakfast question, a seat near the window.' A colleague says: 'Or we could just refer him and know.'",
        prompt: "What do you say to her?",
        choices: [
          { label: "'Refer to what, exactly? Can you name the disability you're ruling in?'",
            tag: "reframe",
            feedback: "Direct. A referral without a specific hypothesis is a fishing expedition — and the fish we catch are disproportionately Black boys. Name the hypothesis or don't refer." },
          { label: "'Sure, let's do both — check-ins and referral paperwork in parallel.'",
            tag: "pause",
            feedback: "Feels thorough; isn't. Tier 1 that runs in the shadow of paperwork is Tier 1 that no one takes seriously. Do one thing well for two weeks." },
          { label: "'If two weeks of check-ins don't move anything, I'll write the referral myself.'",
            tag: "reframe",
            feedback: "Commits to a timeline. Makes Tier 1 a real try, not a stall. Honors both the colleague's concern and the principle of slowing down." }
        ]
      },
      afterAsk: {
        label: "Scene 2 · Friday, last 10 minutes",
        beat: "You pull DeShawn aside. 'DeShawn — you know how sometimes days are tough and sometimes they're good? What makes a tough day tough?' He thinks. 'My dad's house smells like smoke. I hate it. I don't sleep.'",
        prompt: "What do you do with that?",
        choices: [
          { label: "Sit with it. Don't fix it in the moment. Thank him.",
            tag: "reframe",
            feedback: "He just told you something he hasn't told his mom. Fixing it fast is adult-sized; thanking him is child-sized. Call his mom tonight." },
          { label: "Tell him you'll call his mom today and make it better",
            tag: "consider",
            feedback: "You will call his mom. Promising to 'make it better' with his dad's house is a promise you can't keep and he'll remember. Keep the promise small and true." },
          { label: "Ask more questions — has he told anyone else, is he safe?",
            tag: "reframe",
            feedback: "Right next step. Quiet, non-leading: 'Is there anything you want me to do with this? Anything not safe?' Then call his mom, and if warranted, a counselor." }
        ]
      }
    },
    research: {
      quote: "Black students are 40% more likely to be identified with emotional/behavioral disorders, and far less likely to be identified with specific learning disabilities, than white peers with similar profiles.",
      cite: "National Center for Learning Disabilities"
    },
    commitment: "Before any SPED referral, I will gather ______ pieces of family context and ______ pieces of Tier 1 data."
  },

  // ─────────────────────────────────────────────────────────────
  // 07 · Peer conflict
  // ─────────────────────────────────────────────────────────────
  {
    id: "s07",
    category: "Peer-to-peer conflicts",
    title: "The playground scuffle",
    time: "7 min",
    color: "#b87a3e",
    contentNote: {
      heading: "Before you begin",
      body: "This scenario involves a racialized comment about a Black girl's hair. The module asks you to name that specifically — not as 'kids being kids.' If you're new to adultification research, you'll find a pointer in the research pull-quote."
    },
    setup: {
      all: "Two third-graders come in from recess flushed and tearful. Tyler (white) says Amara (Black) pushed him. Amara says Tyler called her hair 'weird' first. A yard-duty aide only saw the push."
    },
    vignette: {
      label: "Scene 1 · Recess · 11:42",
      transcript: [
        { who: "Tyler", line: "She pushed me for no reason!" },
        { who: "Amara", line: "He said my hair looked weird. He keeps saying it." },
        { who: "Tyler", line: "It was a joke." },
        { who: "Amara", line: "He pulled a piece of it yesterday." },
        { who: "Yard duty", line: "I only saw her push him. That's all I can report." },
        { who: "Tyler's friend", line: "[to Tyler, behind hand] 'Bro, don't say the hair thing.'" }
      ]
    },
    prompt: "Which move listens to both children?",
    choices: [
      { label: "'Push is the physical act' — Amara loses recess tomorrow",
        tag: "pause",
        feedback: "'The physical act' framework consistently penalizes Black girls, whose verbal harms toward them are treated as words while their response is treated as violence. Both matter.",
        next: "afterPunish" },
      { label: "Hear both, name both harms, plan both repairs",
        tag: "reframe",
        feedback: "Restorative basics. The hair comment is a racialized harm, not a 'kids will be kids' moment. Naming that to Tyler is part of his learning, not a punishment.",
        next: "afterRestor" },
      { label: "Send both to the counselor — above your pay grade",
        tag: "consider",
        feedback: "Sometimes right. But offloading race-adjacent conflicts teaches kids their teacher won't handle them. Small third-grade moments are exactly where repair muscles are built.",
        next: "afterCounselor" },
      { label: "Separate them; talk to each privately before deciding anything",
        tag: "reframe",
        feedback: "Foundational. You can't get to repair without the private piece first — especially for Amara, who may not tell the full story in front of Tyler.",
        next: "afterPrivate" }
    ],
    step2: {
      afterPunish: {
        label: "Scene 2 · End of day · Amara's mom at pickup",
        beat: "Amara's mom comes up at dismissal. 'Amara said you took her recess for pushing Tyler. Did she tell you what he said about her hair?' She's not raising her voice. She's looking at you.",
        prompt: "What do you say?",
        choices: [
          { label: "'She did. I took the recess because pushing isn't okay.'",
            tag: "pause",
            feedback: "You just told Amara's mom that her daughter's body being grabbed and mocked is the 'words' part of the equation. Mom's face is telling you what the research says: this is how Black girls learn not to report." },
          { label: "'I heard about the hair. I handled the push piece and I didn't handle the hair piece well. Can we talk tomorrow morning about Tyler?'",
            tag: "reframe",
            feedback: "The repair. You named the mistake, you kept the accountability, you offered a real next step. This is how parents of color decide whether to keep telling you things." },
          { label: "'Both kids were out of line.'",
            tag: "pause",
            feedback: "'Both kids were out of line' is the false-equivalence move. One kid was physically touched and verbally mocked; the other pushed in response. Both matter; they are not the same." }
        ]
      },
      afterRestor: {
        label: "Scene 2 · Next morning · the repair circle",
        beat: "You set up a five-minute circle with Tyler, Amara, and yourself. Tyler says: 'I'm sorry I pushed you.' You pause — Amara is looking at you.",
        prompt: "What do you do?",
        choices: [
          { label: "'Tyler — she didn't push you. Can you say what you're sorry for?'",
            tag: "reframe",
            feedback: "Precise, non-shaming, necessary. 'I'm sorry I pushed you' is a script Tyler learned; it's also wrong. Repair requires accuracy." },
          { label: "Let it go — the apology is the point",
            tag: "pause",
            feedback: "The apology is not the point. The accurate apology is. Rehearsed wrong apologies are how kids learn that 'sorry' is a password." },
          { label: "'Amara, how did that land?'",
            tag: "reframe",
            feedback: "Puts her experience at the center. She may say 'that's not what happened' or 'it's fine' — both are real answers and worth honoring." }
        ]
      },
      afterCounselor: {
        label: "Scene 2 · The counselor's follow-up",
        beat: "The counselor handles the immediate conversation. Three days later, she stops you in the hallway: 'This is the third hair-comment referral I've gotten this month. All different boys, all the same two girls. I can handle the conversations, but the pattern is yours.'",
        prompt: "What do you say?",
        choices: [
          { label: "'I didn't know. Let's meet — what do you need from me?'",
            tag: "reframe",
            feedback: "The counselor just handed you critical data only she could see. 'What do you need from me' turns information into action." },
          { label: "'That's not really a class-level issue.'",
            tag: "pause",
            feedback: "Three incidents, two girls, one month — that's a class-level issue. Dismissing it keeps the counselor alone and the pattern intact." },
          { label: "'I'll address it at morning meeting tomorrow.'",
            tag: "consider",
            feedback: "Good instinct — and risky if it's a generic 'we're kind to each other' speech. Be specific: hair is part of who people are, commenting on it isn't a joke, here's what we do instead." }
        ]
      },
      afterPrivate: {
        label: "Scene 2 · In the hallway, alone with Amara",
        beat: "Amara sits next to you on the low bench. 'Has this happened before?' you ask. She nods. 'Since second grade. Different boys. It's always about my hair or my skin.' She's not crying.",
        prompt: "What do you say?",
        choices: [
          { label: "'I'm so sorry that's been happening. Thank you for telling me. What do you want to happen next?'",
            tag: "reframe",
            feedback: "Honors her age, her agency, and her information. She may want nothing public; she may want Tyler to know you know. Ask her, and then actually do what she said." },
          { label: "'That's bullying and we take it seriously.'",
            tag: "consider",
            feedback: "True and a little scripted. 'Bullying' often triggers a formal process that wasn't what she asked for. Start with her answer, then the process." },
          { label: "'I'll have a talk with Tyler.'",
            tag: "consider",
            feedback: "Fine — and check first whether she wants that. For some Black girls, 'I'll have a talk with him' means 'tomorrow he'll know I told.' Safety before intervention." }
        ]
      }
    },
    research: {
      quote: "Black girls are viewed as less innocent and more adult-like than white girls of the same age, starting as early as age five — a pattern researchers call 'adultification bias.'",
      cite: "Epstein, Blake, & González, Georgetown Law"
    },
    commitment: "When a conflict has a racial layer, I will ______ before deciding consequences — and for hair/skin-based incidents specifically, I will ______."
  },

  // ─────────────────────────────────────────────────────────────
  // 08 · Grading
  // ─────────────────────────────────────────────────────────────
  {
    id: "s08",
    category: "Grading & feedback language",
    title: "Reading the same essay twice",
    time: "7 min",
    color: "#4a6b5a",
    contentNote: {
      heading: "Before you begin",
      body: "The data in this module comes from randomized studies where the same essay was presented to teachers with different student names. This is one of the most replicated effects in education research."
    },
    setup: {
      all: "You're grading narrative essays. Two sit next to each other in the stack, both about grandparents, similar length, similar mechanics. You stop at your own margin notes."
    },
    vignette: {
      label: "Scene 1 · Your own margin comments",
      transcript: [
        { who: "Aiden W.", line: "\"Vivid voice! Strong verbs. Push to vary sentence length. 4/5.\"" },
        { who: "Keisha J.", line: "\"Good effort. Watch for run-ons. 3/5.\"" },
        { who: "Side-by-side line (both papers)", line: "'Grandma's hands smelled like cinnamon and something I still can't name.'" },
        { who: "Your note next to Aiden's line", line: "'!!! → strong verbs, sensory specificity'" },
        { who: "Your note next to Keisha's line", line: "[nothing]" }
      ]
    },
    prompt: "Same sentence. What happened?",
    choices: [
      { label: "Regrade Keisha with the same lens you used on Aiden",
        tag: "reframe",
        feedback: "Yes — and save both as a check on yourself. 'Vivid voice' is the kind of praise that compounds; 'good effort' is the kind that deflates.",
        next: "afterRegrade" },
      { label: "Defend the grades — they're defensible on the rubric",
        tag: "pause",
        feedback: "Defensible isn't the bar. The bar is: would a stranger, reading both essays blind, give them the same feedback? If not, bias is in the margins, literally.",
        next: "afterDefend" },
      { label: "Grade the rest of the stack name-hidden and see what happens",
        tag: "reframe",
        feedback: "One of the most replicated interventions in teacher-bias research. Anonymity shifts grade distributions for students of color upward on open-response work.",
        next: "afterBlind" },
      { label: "Show both to a grade-team partner and compare feedback",
        tag: "reframe",
        feedback: "Calibration with peers reduces drift. Especially useful on subjective rubrics like 'voice' and 'effort.'",
        next: "afterPeer" }
    ],
    step2: {
      afterRegrade: {
        label: "Scene 2 · Regrading Keisha",
        beat: "You reread. The cinnamon line. A scene with her grandma braiding hair on the porch that you glossed over. A risky metaphor comparing her grandmother's laugh to a house settling. You raise the grade to 4.5/5.",
        prompt: "What do you write in the new comment?",
        choices: [
          { label: "'Keisha — the cinnamon line and the porch scene are some of the strongest writing in the class. The braiding passage is what sensory specificity is. Push to vary sentence length.'",
            tag: "reframe",
            feedback: "Specific, aspirational, skill-focused. That's the feedback you gave Aiden. That's the feedback Keisha deserved the first time." },
          { label: "'Great job, Keisha!'",
            tag: "pause",
            feedback: "You did the regrade. Now you're doing the generic comment because you haven't practiced the specific-praise muscle with Keisha's voice. Try again." },
          { label: "'I re-read this and I was wrong the first time. Here's what I missed.'",
            tag: "reframe",
            feedback: "Risky and powerful. Eight-to-ten-year-olds can hold a teacher's public correction; many of them have been waiting for it." }
        ]
      },
      afterDefend: {
        label: "Scene 2 · End of quarter",
        beat: "Grades go home. Keisha's mom requests a meeting. She brings Aiden's mom, who happens to be her friend. They put both essays on the table. 'Can you walk us through why one is a 4 and one is a 3?'",
        prompt: "What do you say?",
        choices: [
          { label: "'I was wrong. I'm regrading Keisha's tonight.'",
            tag: "reframe",
            feedback: "The rarest sentence in parent-teacher conferences, and the one that rebuilds trust fastest. Two Black mothers just saved you from writing the same margin notes for another year." },
          { label: "Walk through the rubric for each",
            tag: "pause",
            feedback: "You can walk through the rubric and still be walking into the same wall. The rubric did not do this; you did. Stand by the rubric if you must, but first answer the question they asked: why?" },
          { label: "'I see what you're pointing at. Let me take these home tonight and come back Friday with a real answer.'",
            tag: "reframe",
            feedback: "Buys honest time, not a stall. Friday, come back with a regrade and a plan for the stack you haven't graded yet." }
        ]
      },
      afterBlind: {
        label: "Scene 2 · The stack, name-hidden",
        beat: "You grade 14 more essays with names covered. When you reveal the names, three essays you'd have guessed were 'C-range' are from white students, and two essays you graded 5/5 are from students of color you'd have called 'inconsistent writers.'",
        prompt: "What do you do with this?",
        choices: [
          { label: "Keep grading blind for the rest of the year, on all open-response work",
            tag: "reframe",
            feedback: "Turn the experiment into a practice. Two minutes of folded paper saves a year of drift." },
          { label: "Tell the students you're doing this and why",
            tag: "reframe",
            feedback: "Vulnerable and pedagogical. Third- and fourth-graders can hold 'I was grading you partly by who you are and I'm going to stop.' That sentence is an education in itself." },
          { label: "Keep this to yourself — it's embarrassing",
            tag: "pause",
            feedback: "Embarrassment is not a classroom-management tool. The students whose grades were low because of bias deserve to know the bias was named." }
        ]
      },
      afterPeer: {
        label: "Scene 2 · With your team partner",
        beat: "Your partner reads both, names covered. She marks Aiden's 3.5 and Keisha's 4. Then you show her the names. She says: 'Huh. I would have bet the other way.'",
        prompt: "What do you do with that?",
        choices: [
          { label: "'Let's make this a thing — name-hidden calibration on every open-response stack for the rest of the year.'",
            tag: "reframe",
            feedback: "A single moment of calibration is an anecdote; a practice is a structure. You just upgraded bias-check from incident to habit." },
          { label: "'Interesting.' [move on]",
            tag: "pause",
            feedback: "'Interesting' is the sound of bias being named and set down unused. You have the data; you have a partner; you have the means. Build the practice." },
          { label: "'Let's use the same rubric language together so our margin notes match.'",
            tag: "reframe",
            feedback: "Margin-note calibration catches drift before it becomes a grade. 'Specific praise on risky language' is a phrase you can now use with a partner who'll call you on missing it." }
        ]
      }
    },
    research: {
      quote: "When the same student essay is presented with a white-sounding or Black-sounding name, teachers on average give the Black-named version a lower grade and more deficit-framed feedback.",
      cite: "Quinn, 'Experimental evidence on teachers' racial bias'"
    },
    commitment: "This quarter, I will grade at least ______ assignments name-hidden — and I will calibrate with ______ at least ______ times."
  },

  // ─────────────────────────────────────────────────────────────
  // 09 · Bias check
  // ─────────────────────────────────────────────────────────────
  {
    id: "s09",
    category: "Quick bias check",
    title: "First-word association",
    time: "5 min",
    color: "#5a4a6b",
    contentNote: {
      heading: "Before you begin",
      body: "This isn't a diagnosis and there's no score. It's a noticing exercise. Bias work isn't about catching yourself being 'a bad person' — it's about watching the brain do what brains do, in front of you, so you can design around it."
    },
    setup: {
      all: "You'll see four student descriptions. Same facts, different race and gender. Read each. Don't plan your answer. Just notice the first word or phrase your brain produces."
    },
    vignette: {
      label: "Scene 1 · Rapid association · 4 students",
      transcript: [
        { who: "A", line: "Eight-year-old Black girl, tall for her age, takes charge in group work." },
        { who: "B", line: "Eight-year-old white girl, tall for her age, takes charge in group work." },
        { who: "C", line: "Eight-year-old Black boy, energetic, asks a lot of questions." },
        { who: "D", line: "Eight-year-old white boy, energetic, asks a lot of questions." }
      ]
    },
    prompt: "If the word that surfaced for A differed from B — or C from D — what does that tell you?",
    choices: [
      { label: "That I have biases. Everyone does.",
        tag: "reframe",
        feedback: "Correct, and the starting point, not the endpoint. The real question: which of today's classroom decisions does this bias touch?",
        next: "afterAck" },
      { label: "That the test is flawed",
        tag: "pause",
        feedback: "An understandable response; researchers have documented it as one of the most common. Notice the defensiveness — it's often the clearest evidence the association landed.",
        next: "afterDeflect" },
      { label: "That I need to think more before I respond to students",
        tag: "reframe",
        feedback: "Slow thinking is the single most protective habit against implicit bias. Friction in the moment is a feature.",
        next: "afterSlow" },
      { label: "I'm not sure what it tells me",
        tag: "consider",
        feedback: "'Not sure' is the honest answer most of the time with bias work. Sit with the word that surfaced. Write it down. Return to it.",
        next: "afterUnsure" }
    ],
    step2: {
      afterAck: {
        label: "Scene 2 · The follow-up question",
        beat: "Okay — so you have biases. Which decision, this week, was colored by one?",
        prompt: "Pick the one you'd rather not pick.",
        choices: [
          { label: "Who I called on in whole-group",
            tag: "reframe",
            feedback: "The most common answer, and the most fixable. Start there tomorrow." },
          { label: "What I wrote in a referral or conference note",
            tag: "reframe",
            feedback: "Written language outlives the moment. Margin comments become cumulative files become tracks. Audit a week of yours this weekend." },
          { label: "Who I assumed would 'handle' a task vs. need help",
            tag: "reframe",
            feedback: "Hidden and powerful. The students we hand independence to — and the ones we over-scaffold — tend to split along race lines we haven't examined." },
          { label: "Who got my leftover attention at the end of the day",
            tag: "reframe",
            feedback: "The day is a scarcity and your attention is currency. Who bought the last coin today? Look for the pattern over a week." }
        ]
      },
      afterDeflect: {
        label: "Scene 2 · Sit with it",
        beat: "You don't have to accept the framing. But notice: the instinct to argue with the test is the same instinct that argues with the parent, with the data, with the pattern. Familiar?",
        prompt: "What do you do with that instinct?",
        choices: [
          { label: "Write the defense out in one sentence, read it back",
            tag: "reframe",
            feedback: "Defenses often sound less convincing once you see them in your own handwriting. This is cheap and often clarifying." },
          { label: "Notice whose voice the defense is answering",
            tag: "reframe",
            feedback: "Is it answering a researcher? A parent? A colleague? A kid? Who gets defended against tells you something about who you expect to have to defend yourself from." },
          { label: "Take the exercise again in a week",
            tag: "consider",
            feedback: "Fine. Also: the exercise isn't the thing. The next decision is the thing. Design the next decision as if the associations were real." }
        ]
      },
      afterSlow: {
        label: "Scene 2 · What 'slow' looks like in a classroom",
        beat: "Slow thinking sounds great and is hard at 10:14 Tuesday. Which of these is a slow-thinking tool you'd actually use?",
        prompt: "Pick one to try this week.",
        choices: [
          { label: "A 10-second rule: no referrals, no recess loss, no consequence within 10 seconds of the trigger",
            tag: "reframe",
            feedback: "Ten seconds is enough for the fast brain to hand off to the slower one. One of the highest-leverage habits in this training." },
          { label: "A 'before I decide' question: 'What would I do if this were a different student?'",
            tag: "reframe",
            feedback: "Forces the counterfactual. It's uncomfortable; that's how you know it's working." },
          { label: "A walk to the door and back before I write anything",
            tag: "reframe",
            feedback: "Physical breaks the loop. Especially useful for written decisions — referrals, comments, emails — where the words outlive the moment." }
        ]
      },
      afterUnsure: {
        label: "Scene 2 · Sit with the word",
        beat: "Okay. Whichever descriptor surfaced — you don't have to share it, you don't have to fix it now. The assignment is to write it down somewhere only you can see, and come back to it.",
        prompt: "When will you come back to it?",
        choices: [
          { label: "Tomorrow morning before school",
            tag: "reframe",
            feedback: "Tight loop. You'll be able to tell whether the word surfaces in a planning decision that day." },
          { label: "Sunday, with my planner open",
            tag: "reframe",
            feedback: "Sunday planning is a natural audit moment. Pair it with next week's seating chart or small-group list." },
          { label: "Next time I'm about to write a comment or referral",
            tag: "reframe",
            feedback: "Point of decision. The word's job is to meet you at the moment the brain is about to default. Put it there." }
        ]
      }
    },
    research: {
      quote: "Over 85% of educators who take the Race IAT show some degree of implicit pro-white association — including the majority of educators of color.",
      cite: "Project Implicit, Harvard"
    },
    commitment: "When I notice a snap judgment about a student this week, I will ______ before I act on it."
  },

  // ─────────────────────────────────────────────────────────────
  // 10 · Commitment
  // ─────────────────────────────────────────────────────────────
  {
    id: "s10",
    category: "Commitment & action",
    title: "What are you taking with you?",
    time: "7 min",
    color: "#3e6b5a",
    contentNote: {
      heading: "Before you begin",
      body: "The last module. Bias training without structural follow-through shows null effects at 90 days. This one asks you to pick three things specific enough to be done by Friday."
    },
    setup: {
      all: "Nine scenarios done. Implicit bias is not a character flaw — it's the default setting of a brain raised in a society with patterns. The work is structural: habits, structures, and people who'll tell you the truth."
    },
    vignette: {
      label: "Scene 1 · Your commitments, so far",
      transcript: [
        { who: "From 01 referrals", line: "'I will ask ______ before I agree.'" },
        { who: "From 02 call-ons", line: "'I will track ______ and share it with ______.'" },
        { who: "From 04 conferences", line: "'My notes will include ______ specific observations.'" },
        { who: "From 05 gifted", line: "'Before any academic rec, I will ______.'" },
        { who: "From 08 grading", line: "'I will grade ______ name-hidden.'" },
        { who: "Your margin", line: "Which three will actually survive the first week back?" }
      ]
    },
    prompt: "Pick the tier of commitment you're going to make. Specificity beats ambition.",
    choices: [
      { label: "One small habit (a 10-second pause, a name-hidden stack)",
        tag: "reframe",
        feedback: "Start here. One habit, kept, beats three habits, dropped. You can always add the second next month.",
        next: "afterOne" },
      { label: "Three habits, one per context (whole-group, written, meetings)",
        tag: "reframe",
        feedback: "Good if — and only if — each has a trigger, a structure, and a partner. Otherwise it's three habits dropped.",
        next: "afterThree" },
      { label: "One structural change that doesn't rely on my willpower",
        tag: "reframe",
        feedback: "The most durable kind. Random calling, name-hidden grading, a pre-referral 48-hour pause — things that work even on a Tuesday when you're tired.",
        next: "afterStructural" },
      { label: "I'm not ready to commit yet",
        tag: "consider",
        feedback: "Honest. One thing then: who will you tell about this training by end of the week? Sometimes the first commitment is to a witness, not an action.",
        next: "afterNotYet" }
    ],
    step2: {
      afterOne: {
        label: "Scene 2 · Pick it",
        beat: "One habit. By Friday.",
        prompt: "Which one?",
        choices: [
          { label: "Ten-second rule before any referral or recess loss",
            tag: "reframe",
            feedback: "One of the highest-leverage habits in this training. Pair it with a physical cue — hand on desk, breath — and it survives fatigue." },
          { label: "Name-hidden grading on one stack this week",
            tag: "reframe",
            feedback: "Two minutes of folded paper. Test the effect on yourself before the whole team is convinced." },
          { label: "One 'what's strong at home?' question at every conference this cycle",
            tag: "reframe",
            feedback: "Low-effort, high-information. Changes the shape of the conference for families who've only ever been told what's wrong." },
          { label: "Random calling in one subject this week",
            tag: "reframe",
            feedback: "One subject, one week, one tool. Small enough to actually start; big enough to notice." }
        ]
      },
      afterThree: {
        label: "Scene 2 · Make them real",
        beat: "For each of the three, write: trigger (when), structure (what), partner (who checks). Pick which to start Monday.",
        prompt: "Which has the strongest trigger?",
        choices: [
          { label: "Whole-group: random caller, every morning meeting, partner = grade team",
            tag: "reframe",
            feedback: "Clean. The trigger is the meeting itself; the structure is the sticks; the partner is built-in." },
          { label: "Written: name-hidden grading on open-response, every Sunday, partner = team teacher",
            tag: "reframe",
            feedback: "Weekly ritual. Pair with a ten-minute calibration call with the partner. That phone call is the whole thing." },
          { label: "Meetings: 'what would I do if this were a different student?', before any referral, partner = instructional coach",
            tag: "reframe",
            feedback: "High-leverage. The coach becomes the witness; the counterfactual becomes the habit." }
        ]
      },
      afterStructural: {
        label: "Scene 2 · Pick the structure",
        beat: "Structures beat willpower because they don't care how tired you are.",
        prompt: "Which one?",
        choices: [
          { label: "Pre-referral 48-hour pause: no referral written within 48 hours of the incident",
            tag: "reframe",
            feedback: "Huge effect on referral patterns in districts that have piloted it. The pause is the intervention." },
          { label: "Name-hidden grading on all open-response, all year",
            tag: "reframe",
            feedback: "Quietest civil-rights tool in a teacher's toolkit. Costs nothing; shifts distributions measurably." },
          { label: "Monthly equity data pull — call-ons, referrals, gifted nominations — on myself",
            tag: "reframe",
            feedback: "Self-data is the single most common ingredient in teachers who report real change. Calendar it." },
          { label: "A standing 15 minutes with one colleague every other week — bias check as a practice",
            tag: "reframe",
            feedback: "The partner-as-structure. Bias is hardest to see from inside; it's cheap to see from two feet away." }
        ]
      },
      afterNotYet: {
        label: "Scene 2 · Pick your witness",
        beat: "Commitment without a witness is a diary entry. Who will you tell, by Friday, that you did this training?",
        prompt: "Pick one.",
        choices: [
          { label: "A colleague who will actually ask me about it in two weeks",
            tag: "reframe",
            feedback: "The second question — 'hey, how's that going?' — is doing the work. Pick a colleague who asks them." },
          { label: "My grade-level team at our next meeting",
            tag: "reframe",
            feedback: "Moves it from personal to professional. Once it's on the agenda, it's a practice, not a mood." },
          { label: "A student's parent I want to be in better relationship with",
            tag: "reframe",
            feedback: "Unusual and powerful. 'I'm doing some work on how I talk about families' is the sentence that makes a parent lean in." },
          { label: "No one yet — I'll start with writing it for myself",
            tag: "consider",
            feedback: "Fine, temporarily. Private commitments have a short half-life; calendar a 'tell someone by Friday' reminder." }
        ]
      }
    },
    research: {
      quote: "Bias training without structural follow-through shows null effects at 90 days. Training plus one sustained structural change shows measurable shifts in referral and grading patterns.",
      cite: "Forscher et al., meta-analysis, JPSP"
    },
    commitment: "My three specific commitments, starting Monday: 1) ______  2) ______  3) ______  ·  Witness: ______  ·  Check-in date: ______"
  }
];

Object.assign(window, { SCENARIOS, GRADE_BAND });
