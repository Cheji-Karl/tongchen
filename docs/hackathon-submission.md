# 同尘｜Hackathon Submission

## One-line pitch

同尘是一个由 AI 理解用户当下状态与社交边界，让生活碎片被合适的人温柔接住的无压力分享空间。

Tongchen is an AI-powered, low-pressure social space that understands a person’s current state and boundaries, then delivers ordinary moments to a small number of people who can receive them with care.

## Problem

Life is already difficult, yet opening a social network often means facing arguments, comparison, performance, and attention competition. At the same time, many young people feel lonely and occasionally want to share a sentence, a view, or a meal—without broadcasting it to everyone or starting a demanding relationship.

## Insight

Sharing is not the same as requesting evaluation. A person is also not a fixed set of labels: their interests may remain stable while their energy, needs, and boundaries change from day to day.

## Solution

Tongchen replaces the public-broadcast model with a three-part loop:

1. **Understand:** AI interprets free-form self-description into an evolving, user-controlled understanding of interests, state, expression style, and boundaries.
2. **Deliver:** each moment goes to a small number of compatible receivers, using common ground for safety and gentle difference for discovery.
3. **Receive:** interaction begins with being seen, shared experience, or a parallel story—not public judgement, follower counts, or reply pressure.

## What makes it different

- No public popularity metrics or compatibility scores.
- The user chooses how each post should be received.
- AI understandings are explainable, editable, pausable, and temporary.
- Recommendation starts with boundary compatibility, not engagement probability.
- Safety is built into the approach rate, privacy layer, and interaction design.

## Demo flow

1. Switch between Chinese and English.
2. Open “Demo tour” and describe the person you are today.
3. Confirm the AI-generated dynamic understanding.
4. Enter the Glow feed and inspect why a moment was delivered.
5. Leave a moment, select the desired response, and confirm AI interpretation.
6. Open Meet to see shared ground and meaningful difference.
7. Open “Now, me” to pause an AI understanding and demonstrate safety protection.

## Responsible AI

Tongchen treats AI as a translator and organiser rather than an identity authority. Sensitive identities and diagnoses are not inferred. Internal vulnerability signals are never exposed to other users or used for advertising. Every interpretation has provenance and user controls.

## Success metric

Our north-star metric is the **Expected Reception Rate**: the percentage of shares that creators say were received in the way they hoped.

Supporting measures include AI-understanding confirmation, boundary-respect rate, post-sharing stress change, cross-difference connection, and unsafe-interaction rate.

## Technical approach

- React and TypeScript interactive prototype
- OpenAI Responses API with GPT-5.6 Terra for structured understanding
- Boundary-first matching model
- Risk filtering before delivery and during interaction
- Bilingual interface with future post-level translation consent

## How we used Codex

Codex served as a continuous product and engineering collaborator. It helped turn the initial “harmony in difference” concept into the Understand → Deliver → Receive loop, implemented the responsive bilingual prototype, audited untranslated UI states, added the GPT-5.6 understanding route and transparent fallback, verified production builds, and prepared the demo and submission narrative.

## How we used GPT-5.6

The composer sends a user’s free-form moment to an OpenAI Responses API route using GPT-5.6 Terra. The model returns a constrained JSON interpretation of the sharing intent, present feeling, desired response boundary, and a short human-readable summary. The user sees this interpretation before publishing and remains in control. If no API key is configured, the product labels the result as a demo fallback rather than implying that a model call occurred.

## Product vision

The internet does not need another place where everyone speaks louder. Tongchen offers a quieter alternative: share a little of life without facing the whole world.
