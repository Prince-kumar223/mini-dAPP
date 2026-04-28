const STORAGE_KEY = 'mini-dapp-feedback';

const readFeedbackStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const writeFeedbackStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const createFeedbackEntry = (text) => {
  const store = readFeedbackStore();
  const ids = Object.keys(store).map(Number);
  const nextId = ids.length ? Math.max(...ids) + 1 : 1;

  store[nextId] = text;
  writeFeedbackStore(store);

  return nextId;
};

export const getFeedbackEntry = (id) => {
  const store = readFeedbackStore();
  return store[id] || null;
};
