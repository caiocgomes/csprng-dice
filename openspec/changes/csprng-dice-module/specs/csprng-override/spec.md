## ADDED Requirements

### Requirement: CSPRNG replaces default RNG
The module SHALL override `CONFIG.Dice.randomUniform` during Foundry's `init` hook to use `crypto.getRandomValues()` instead of `Math.random()`.

#### Scenario: Module initializes and overrides RNG
- **WHEN** Foundry fires the `init` hook with this module active
- **THEN** `CONFIG.Dice.randomUniform` SHALL be a function that uses `crypto.getRandomValues()` internally

### Requirement: Random output is uniform in [0, 1)
The override function SHALL return a floating-point number in the range [0, 1) with uniform distribution, matching the contract of the original `CONFIG.Dice.randomUniform`.

#### Scenario: Output range is valid
- **WHEN** the override function is called
- **THEN** it SHALL return a number >= 0 and < 1

#### Scenario: Conversion uses Uint32 division
- **WHEN** the override function generates a random value
- **THEN** it SHALL create a `Uint32Array(1)`, fill it via `crypto.getRandomValues()`, and divide by 4294967296 (2^32)

### Requirement: Module manifest targets Foundry v10
The `module.json` manifest SHALL declare minimum and verified compatibility as Foundry v10.

#### Scenario: Manifest compatibility fields
- **WHEN** Foundry reads the module manifest
- **THEN** `compatibility.minimum` SHALL be "10" and `compatibility.verified` SHALL be "10"
