import { MoneyOrCurrencyPipe } from './money-or-currency.pipe';

describe('MoneyOrCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyOrCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
