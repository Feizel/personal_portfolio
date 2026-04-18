---
id: 6
slug: polymarket-finance-algorithms
title: "CASE STUDY: R1,300 → Polymarket BTC Scalping"
excerpt: "A bounded system with 300 seconds to resolution. A Fokker-Planck solver. 43 lessons. And the honest math of whether any of it works."
date: "2025-04-18"
readTime: "27 min read"
status: "research-in-progress"
tags: ["markets", "finance", "Software Development", "quant"]
---

<img src="/blogphotos/plymrkt_btc_engine.png" alt="Polymarket BTC Engine" style="width: 100%; height: 160px; object-fit: cover; object-position: center center; border-radius: 8px; margin-bottom: 1rem;" class="blog-hero-image" />

<style>
@media (min-width: 768px) {
  .blog-hero-image {
    height: 250px !important;
  }
}
</style>

## The Hook

I didn't set out to build a trading engine. I set out to answer a question: if you know exactly when a system resolves, and you can model the physics of how uncertainty collapses over that interval, can you price binary outcomes better than a prediction market?

The answer, after 43 lessons and several thousand lines of code, is: *it depends*. And the "depends" is more interesting than a clean yes or no.

This is the story of Ephemeris — a system that applies techniques from stellar physics to 5-minute binary options on Polymarket. Not because crypto prediction markets are the most important problem in the world, but because they're a near-perfect laboratory: bounded time horizons, continuous price feeds, known resolution mechanics, and a market full of participants who mostly don't think in terms of Fokker-Planck equations.

> **Ephemeris** — In astronomy, an ephemeris is a table of positions — where celestial bodies will be at specific times. The name felt right for a system that tries to predict where a price will be at a known future moment.

What follows is not a pitch. There's no "10x returns" claim at the end. This is a research log: what we built, what the math says, what broke, and what we're still figuring out. The `RESEARCH IN PROGRESS` badge at the top of this page is honest, not a hedge.

## The Problem

Polymarket runs 5-minute binary markets on BTC price movement. The question is simple: will BTC be above or below a strike price when the clock hits zero? You buy YES or NO shares. If you're right, each share pays $1. If you're wrong, it pays $0.

```
EPHEMERIS — Market Structure
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Market:     BTC 5-min Binary Option
Duration:   300 seconds
Resolution: Chainlink oracle price at T=0
Outcome:    YES ($1.00) or NO ($0.00)
Exchange:   Polymarket CLOB (Central Limit Order Book)
Settlement: CTF (Conditional Token Framework) on Polygon
```

The mechanics matter. Polymarket isn't a traditional exchange — it's a hybrid. Orders flow through a Central Limit Order Book, but settlement happens on-chain through the Conditional Token Framework. Each market creates two complementary tokens (YES and NO) whose prices must sum to $1. A Chainlink oracle provides the resolution price at expiry.

This creates a system with properties that physicists find interesting:

- **Bounded time horizon.** You know exactly when the system resolves. Not "eventually" — in 300 seconds.
- **Known boundary conditions.** At T=0, the price is either above or below the strike. The probability collapses to 0 or 1.
- **Continuous observation.** BTC spot price is observable in real-time throughout the interval.
- **Mean-reverting uncertainty.** As time passes, the remaining uncertainty about the outcome *must* decrease — there's less time for the price to move.

> **Boundary conditions** — In physics, a boundary value problem is one where you know the state of the system at the edges (here: the start and end of the 5-minute window) and need to solve for the dynamics in between. This is exactly the structure of a Brownian bridge.

If you squint at this the right way, it's not a financial problem at all. It's a bounded diffusion process with absorbing barriers. The same mathematics that describes a particle diffusing in a potential well, or a star's luminosity fluctuating around equilibrium, describes how BTC price uncertainty evolves over a 5-minute window.

The question Ephemeris asks: can we solve this diffusion problem more accurately than the market's implied probability, and trade the difference?

### The Market's Blind Spot

Most Polymarket participants price these contracts using intuition, simple momentum indicators, or by watching the order book. Very few model the *time-dependent structure* of the uncertainty. A contract with 240 seconds remaining and one with 30 seconds remaining, both showing BTC $50 above the strike, should have very different probabilities — but the market often prices them similarly.

This is the edge hypothesis: the market underweights the physics of time-dependent uncertainty collapse.

```
EPHEMERIS — Engine Output
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[MARKET]  BTC-5MIN-2025-04-18-1430  Strike: $84,250.00
[SPOT]    $84,312.47  (+$62.47 above strike)
[TIME]    T-187s remaining
[REGIME]  TRENDING (momentum: +0.73σ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[BRIDGE]  P(YES) = 0.7234  (σ_eff = 0.00847)
[MARKET]  P(YES) = 0.6800  (implied from mid-price)
[EDGE]    +4.34¢  → BUY YES @ 0.68
[SIZE]    12 contracts (Kelly: 0.064)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## The Hypothesis

*Content from PHYSICS_RESEARCH.md — the Brownian bridge derivation, physics signals (Chandrasekhar, Hawking, Kepler), and the core mathematical framework. To be written as the research matures.*

## The Engine

*Architecture diagram, lifecycle model, strategy pattern, code snippets. To be written.*

## The Math

*Fokker-Planck solver, σ estimation, CRPS scoring, PIT calibration. This section will include interactive charts.*

Below is a proof-of-concept description — a PIT (Probability Integral Transform) histogram from synthetic calibration data. In a well-calibrated model, this histogram should be uniform across all bins.

| Bin | Count |
|-----|-------|
| 0.0–0.1 | 42 |
| 0.1–0.2 | 38 |
| 0.2–0.3 | 55 |
| 0.3–0.4 | 47 |
| 0.4–0.5 | 51 |
| 0.5–0.6 | 44 |
| 0.6–0.7 | 39 |
| 0.7–0.8 | 58 |
| 0.8–0.9 | 36 |
| 0.9–1.0 | 50 |

*Uniform reference value: 46*

The deviations from the uniform reference line tell us where the model is miscalibrated. Excess mass in the tails (0.0–0.1 and 0.9–1.0 bins) would indicate the model's predicted probabilities are too confident. Excess mass in the center would indicate under-confidence.

## The Reality

*L031 through L043. The anti-predictive finding. The Gaussian assumption failure. The fat-tails discovery. To be written.*

## What's Next

*σ inflation factor, maxEdge gate, regime-conditioned PIT. To be written.*

## The Unifying Principle

*The final synthesis from PHYSICS_RESEARCH.md — "Every signal above shares one mathematical structure..." To be written.*
