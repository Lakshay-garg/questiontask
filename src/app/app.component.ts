import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'questions';

  inputArray: string = '';
  uniqueElements: string = '';

  pricesInput: string = '';
  prices: number[] = [];
  maxProfit: number = 0;

  expressionInput: string = '';
  result: number | null = null;

  removeDuplicates(): void {
    const nums: number[] = this.inputArray.split(',').map(Number);
    const k: number = this.removeDuplicatesFromSortedArray(nums);
    this.uniqueElements = k.toString();
  }

  removeDuplicatesFromSortedArray(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let uniqueIndex = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] !== nums[uniqueIndex]) {
        uniqueIndex++;
        nums[uniqueIndex] = nums[i];
      }
    }
    
    return uniqueIndex + 1;
  }

  calculateMaxProfit(): void {
    // Convert the comma-separated string input to an array of numbers
    this.prices = this.pricesInput.split(',').map(Number);

    let minPrice = Infinity;
    for (let i = 0; i < this.prices.length; i++) {
      if (this.prices[i] < minPrice) {
        minPrice = this.prices[i];
      } else if (this.prices[i] - minPrice > this.maxProfit) {
        this.maxProfit = this.prices[i] - minPrice;
      }
    }
  }

  evaluateExpression(): void {
    const tokens: string[] = this.expressionInput.split(' ');
    const stack: number[] = [];

    for (const token of tokens) {
      if (this.isOperator(token)) {
        const operand2 = stack.pop() || 0;
        const operand1 = stack.pop() || 0;
        stack.push(this.calculate(operand1, operand2, token));
      } else {
        stack.push(parseInt(token, 10));
      }
    }

    this.result = stack.pop() || 0;
  }

  isOperator(token: string): boolean {
    return token === '+' || token === '-' || token === '*' || token === '/';
  }

  calculate(operand1: number, operand2: number, operator: string): number {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return Math.trunc(operand1 / operand2);
      default:
        return 0;
    }
  }
}

