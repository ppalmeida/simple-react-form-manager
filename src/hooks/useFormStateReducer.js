import { useReducer } from 'react';

function formReducer(state, action) {
  const {
    value, rules, name, pristine,
  } = action;

  const resultBase = { success: true, messages: [], value };
  let result = resultBase;

  if (rules) {
    result = rules.reduce((acc, rule) => {
      const ruleResult = rule(value);
      const tempAcc = { ...acc };
      if (!pristine && ruleResult) {
        tempAcc.success = false;
        tempAcc.messages.push(ruleResult);
      }
      return tempAcc;
    }, resultBase);
  }

  const mergedResult = {
    ...state,
    [name]: { ...action, ...result },
  };
  return mergedResult;
}

export default function useFormStateReducer() {
  return useReducer(formReducer, {});
}
