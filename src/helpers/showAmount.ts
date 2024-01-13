export const showAmount = (amount: number) => {
  let balance = 0;
  if (amount <= 10) {
    balance = Number(amount?.toFixed(4));
  } else if (amount > 10 && amount <= 100) {
    balance = Number(amount?.toFixed(3));
  } else if (amount > 100) {
    balance = Number(amount?.toFixed(2));
  }
  return balance;
};
