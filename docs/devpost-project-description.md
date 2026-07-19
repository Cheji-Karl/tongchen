# Inspiration

Life is already difficult, but opening a social network often means entering more argument, comparison, performance, and attention competition. At the same time, many people feel lonely and occasionally want to share a sentence, a view, or a meal—without broadcasting it to everyone or taking on the pressure of a demanding conversation.

Tongchen (同尘) comes from the idea of “seeking common ground while preserving difference.” People are not fixed labels. We have lasting interests, changing emotional states, different ways of expressing ourselves, and boundaries that shift from day to day.

# What it does

Tongchen is an AI-powered, low-pressure social space built around one loop: **Understand → Deliver → Receive**.

- **Understand:** a person writes naturally instead of completing a personality test. AI turns the text into a transparent, user-controlled understanding of intent, present feeling, and response boundaries.
- **Deliver:** a moment reaches a small number of compatible people. Common ground creates safety; a gentle amount of difference creates discovery.
- **Receive:** people begin with “I see you,” shared experience, or a parallel story—not public judgement, follower counts, or reply pressure.

Creators can say whether they only want to be seen, welcome one gentle response, or need no reply. There are no public popularity metrics or compatibility scores.

# How we built it

The interactive bilingual prototype uses React, TypeScript, vinext, and Vite. Its server route calls the OpenAI Responses API with GPT-5.6 Terra and requests constrained JSON containing a short title, sharing intent, current feeling, desired response, and explainable summary. The interpretation is shown before publishing so the person—not the model—has final authority.

Codex was our continuous product and engineering collaborator. It helped shape the core product loop, implement the responsive experience, audit Chinese and English UI states, integrate GPT-5.6 with a transparent no-key fallback, verify production builds, deploy iterations, and prepare the submission and demo narrative.

# Safety and responsible AI

Personalisation increases the need for protection. Tongchen does not infer sensitive identity or diagnosis, does not expose internal vulnerability signals, and does not use them for advertising. Understandings are explainable, editable, pausable, and temporary. The safety concept also includes privacy reminders, limits on rapid approaches from unfamiliar accounts, mutual consent for direct messaging, and intervention when someone requests location, contact details, or money.

# Challenges we ran into

The hardest design challenge was avoiding two extremes: a generic public feed that recreates existing pressure, and an over-personalised bubble that removes meaningful difference. We addressed this by placing boundary compatibility before engagement prediction and by explaining both the shared ground and the gentle difference behind delivery.

Another challenge was keeping AI useful without making it an identity authority. We designed every model output as a provisional interpretation that the user can inspect and control, and we clearly label the fallback when a live model call is unavailable.

# What we learned

“Sharing” and “asking for evaluation” are not the same action. The desired form of reception is a first-class product signal. We also learned that personalisation should model change over time: a person’s energy and boundaries today can matter more than a permanent category.

# What’s next

We want to evaluate GPT-5.6 interpretations with real user examples, measure our north-star metric—the Expected Reception Rate—and run a small closed user study. Future work includes consent-based post translation, stronger explainable delivery, and trust and safety evaluation with adversarial scenarios.
