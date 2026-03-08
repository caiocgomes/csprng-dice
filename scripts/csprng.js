Hooks.once('init', () => {
  CONFIG.Dice.randomUniform = () => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / 4294967296;
  };
});
