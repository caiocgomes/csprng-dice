## 1. Module Structure

- [x] 1.1 Create `module.json` manifest with id, title, description, author, compatibility (v10), and esmodules entry pointing to `scripts/csprng.js`
- [x] 1.2 Create `scripts/` directory

## 2. Core Implementation

- [x] 2.1 Create `scripts/csprng.js` with `Hooks.once('init')` that overrides `CONFIG.Dice.randomUniform` using `crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296`

## 3. Verification

- [ ] 3.1 Install module in Foundry v10, verify it loads without errors
- [ ] 3.2 Roll dice in chat and confirm rolls produce valid results
