## Context

Foundry VTT v10 uses `CONFIG.Dice.randomUniform` as the single source of randomness for all dice rolls. By default, this function wraps `Math.random()` (xorshift128+ in V8). The function is synchronous and returns a float in [0, 1). All Die objects call this function, so overriding it at init time replaces the RNG globally.

The Web Crypto API (`crypto.getRandomValues()`) is available in all modern browsers and in Node.js (Foundry's server runtime), making it a drop-in replacement with no compatibility concerns.

## Goals / Non-Goals

**Goals:**
- Replace `Math.random()` with CSPRNG for all Foundry dice rolls via a single override point
- Zero-configuration module that works on install with no user interaction
- Compatible with Foundry v10 (minimum compatibility version 10, verified compatibility 10)

**Non-Goals:**
- UI, settings panel, or any user-facing configuration
- External RNG services (random.org, etc.)
- Statistical testing or verification tools
- Support for Foundry versions other than v10
- Dice roll logging or auditing

## Decisions

**1. Override point: `CONFIG.Dice.randomUniform`**

This is Foundry's designated hook for custom RNG. Overriding it at the config level means every Die roll in the system uses our function without patching any class methods. Alternatives like monkey-patching `Die.prototype._roll` or `Roll.prototype.evaluate` would be fragile and version-dependent.

**2. Conversion method: Uint32 / (2^32)**

`crypto.getRandomValues()` produces integers. To convert to [0, 1), we generate a single Uint32 and divide by 2^32 (4294967296). This gives ~32 bits of precision in the mantissa, which is more than sufficient (a d100 needs ~7 bits). Alternative: using two Uint32s for full 53-bit float precision is unnecessary for dice.

**3. Module structure: single JS file + manifest**

The module consists of `module.json` (Foundry manifest) and `scripts/csprng.js` (the override). No build step, no dependencies, no bundler.

## Risks / Trade-offs

**[Performance] Crypto RNG is slower than Math.random()** → For dice rolls (tens per second at most), the difference is unmeasurable. Crypto overhead matters at millions of calls/sec, not at RPG scale.

**[Compatibility] Other modules might also override randomUniform** → Module load order determines who wins. This is a Foundry-wide concern, not specific to our approach. Documenting it is sufficient.
