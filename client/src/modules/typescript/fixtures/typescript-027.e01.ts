export class Account { private balance = 4; protected label = 'account'; read() { return this.balance; } }
export const account = new Account();
// @ts-expect-error -- The private modifier prevents external typed access.
export const invalid = account.balance;
