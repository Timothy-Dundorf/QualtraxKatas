using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StringCalculator
{
    public class Calculator
    {
        private Int32 MaxNumeralValue = 1000;
       
        public Int32 Add(String stringNumbers)
        {
            var sum = 0;
            var numerals = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
            var negativeList = new List<Int32>();
            for (int i = 0; i < stringNumbers.Length; i++)
            {
                if (numerals.Contains(stringNumbers[i]))
                {
                    var negativeMultiplier = 1;
                    if (i > 0 && stringNumbers[i - 1].Equals('-'))
                        negativeMultiplier = -1;
                        
                    char[] currentNumberArray = new char[] { '0', '0', '0', '0' };
                    currentNumberArray[3] = stringNumbers[i];

                    while (((i + 1) < stringNumbers.Length) && numerals.Contains(stringNumbers[++i]))
                    {
                        currentNumberArray[0] = currentNumberArray[1];
                        currentNumberArray[1] = currentNumberArray[2];
                        currentNumberArray[2] = currentNumberArray[3];
                        currentNumberArray[3] = stringNumbers[i];
                    }

                    var currentNumber = negativeMultiplier * charArrayToInt32(currentNumberArray);
                    if (currentNumber < 0)
                        negativeList.Add(currentNumber);

                    else if (currentNumber < MaxNumeralValue + 1)
                        sum += currentNumber;
                    
                }
            }
            if (negativeList.Any())
                throw new Exception(listToString(negativeList));
            return sum;
        }

        private string listToString(List<int> intList)
        {
            String newString = ""; 
            foreach (var element in intList)
            {
                newString = newString.;

            }
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
