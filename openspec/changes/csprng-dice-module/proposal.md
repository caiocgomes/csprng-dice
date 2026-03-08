## Why

Foundry VTT v10 uses `Math.random()` (xorshift128+) for all dice rolls. While statistically adequate for most purposes, it's a deterministic PRNG whose state is predictable. Replacing it with `crypto.getRandomValues()` (CSPRNG) provides cryptographically secure randomness sourced from OS-level hardware entropy, eliminating any predictability concern and increasing player trust in dice fairness.

## What Changes

- Override `CONFIG.Dice.randomUniform` at module init to use `crypto.getRandomValues()` instead of `Math.random()`
- Create a minimal Foundry v10 module with `module.json` manifest and a single JS entry point
- No UI, no settings, no external dependencies. Install and forget.

## Capabilities

### New Capabilities
- `csprng-override`: Replaces Foundry's default RNG function with a CSPRNG-based implementation using the Web Crypto API

### Modified Capabilities
<!-- None - this module adds a new capability without modifying existing specs -->

## Impact

- All dice rolls in Foundry (attacks, saves, damage, tables, etc.) will use CSPRNG instead of Math.random()
- No API changes, no breaking changes to other modules
- Works on both client (browser) and server (Node.js) since crypto.getRandomValues() is available in both environments
- Zero configuration required
