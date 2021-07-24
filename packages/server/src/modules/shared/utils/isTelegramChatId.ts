export const isTelegramChatId = (id: string) => {
  return isPublicName(id) || isPrivateId(id);
};

const isPublicName = (id: string) => {
  if (id.length < 2) return false;
  if (id[0] !== '@') return false;
  return true;
};

const isPrivateId = (id: string) => {
  if (id.length !== 14) return false;
  if (id[0] !== '-') return false;
  if (parseInt(id).toString() !== id) return false;
  return true;
};
