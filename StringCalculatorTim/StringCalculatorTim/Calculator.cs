using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StringCalculator
{
    public class Calculator
    {
       
        public Int32 Add(String stringNumbers)
        {
            var sum = 0;
            var numerals = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
            for (int i = 0; i < stringNumbers.Length; i++)
            {
                if (numerals.Contains(stringNumbers[i]))
                {
                    char[] currentNumber = new char[] { '0', '0', '0', '0' };
                    currentNumber[3] = stringNumbers[i];
                    while (((i + 1) < stringNumbers.Length) && numerals.Contains(stringNumbers[++i]))
                    {
                        currentNumber[0] = currentNumber[1];
                        currentNumber[1] = currentNumber[2];
                        currentNumber[2] = currentNumber[3];
                        currentNumber[3] = stringNumbers[i];
                    }
                    sum += charArrayToInt32(currentNumber);
                }
            }
            return sum;
        }

        private Int32 charArrayToInt32(char[] currentNumber)
        {
            var number = 0;
            var multiplier = Convert.ToInt32(Math.Pow(10, currentNumber.Length - 1));
            for (int i = 0; i < currentNumber.Length; i++)
            {
                number += Int32.Parse(currentNumber[i].ToString()) * multiplier;
                multiplier /= 10;
            }
            return number;
        }
    }
}
