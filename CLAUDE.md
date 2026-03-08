# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Foundry VTT v10 module ("csprng-dice") that replaces the default `Math.random()` RNG with `crypto.getRandomValues()` (CSPRNG) for all dice rolls. The entire module is two files: `module.json` and `scripts/csprng.js`.

## Architecture

The module hooks into Foundry's single RNG injection point: `CONFIG.Dice.randomUniform`. This function is called synchronously by every `Die` object during roll evaluation. Overriding it at `Hooks.once('init')` replaces all dice randomness globally with no need to patch classes or methods.

Conversion: `Uint32Array(1)` → divide by 2^32 → uniform float in [0, 1).

## Development

No build step, no dependencies, no bundler. Plain ES module loaded by Foundry.

**To install locally**: symlink or copy this directory into Foundry's `Data/modules/csprng-dice/`, then activate in a world.

**To test**: activate the module in Foundry v10, roll dice in chat (`/roll 1d20`), confirm valid results.

## Constraints

- `CONFIG.Dice.randomUniform` must be **synchronous** (returns a number, not a Promise)
- Target compatibility: Foundry v10 only
- No UI, no settings, no external API calls by design
