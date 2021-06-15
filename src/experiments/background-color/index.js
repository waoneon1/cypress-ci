import './style.css';

export default {
  // A helper exp-{name}-{var} class will be added to the root element
  name: 'background-color',

  // Google optimize experiment id
  experimentID: 'ppNnMo9wRTOCbAWOXAwmUg',

  // [optional] specify number of sections for MVT experiments
  // sections: 1,

  // [optional] maxAge for a user to test this experiment
  // maxAge: 60 * 60 * 24, // 24 hours,

  // [optional] Enable/Set experiment on certain conditions
  // isEligible: ({ route }) => route.path !== '/foo'

  // Implemented variants and their weights
  //   variants: [
  //     { weight: 0 }, // <-- This is the default variant
  //     { weight: 2 },
  //     { weight: 1 }
  //   ],
  variants: [
    { weight: 50 }, // 50% traffic
    { weight: 50 }, // 50% traffic
  ],
};
