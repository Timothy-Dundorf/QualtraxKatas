using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StringCalculator
{
    public class Calculator
    {
        private String[] defaultSeparators = new String[] { " ", "," };

        public Int32 Add(String stringNumbers)
        {
            if (String.IsNullOrEmpty(stringNumbers))
                return 0;

            String[] newSeparatorArray;

            if (stringNumbers[0] == '/')
            {
                var endOfDelimiterString = stringNumbers.IndexOf(' ');
                var newSeparatorString = stringNumbers.Substring(2, endOfDelimiterString - 2);
                stringNumbers = stringNumbers.Remove(0, endOfDelimiterString + 1);
                newSeparatorArray = returnAppendedSeparatorStringArray(newSeparatorString, defaultSeparators);
            }
            //Style Question: should this else have braces to match the if?
            else
                newSeparatorArray = defaultSeparators;
            
            var splitNumbersSortedDescending = stringNumbers.Split(newSeparatorArray, StringSplitOptions.None).OrderByDescending(o => o);

            var negativeNumberString = splitNumbersSortedDescending.Where(n => Convert.ToInt32(n) < 0);

            if (negativeNumberString.Any())
            {
                var message = String.Join(", ", negativeNumberString);
                throw new Exception(message);
            }

            //This function skips over the elements in the sorted descending array while they are greater than 1000 and then sums the rest. 
            var sumTooLargeRemoved = splitNumbersSortedDescending.SkipWhile(o => Convert.ToInt32(o) > 1000).Sum(o => Convert.ToInt32(o));

            return sumTooLargeRemoved;
        }

        private String[] returnAppendedSeparatorStringArray(String newSeparatorString, String[] currentSeparators)
        {
            if (newSeparatorString[0].Equals('['))
            {
                newSeparatorString = newSeparatorString.Trim(new char[] { '[', ']' });
                newSeparatorString = newSeparatorString.Replace("][", ",");
                var newSeperatorArray = newSeparatorString.Split(',');
                return currentSeparators.Concat(newSeperatorArray).ToArray();
            }
            else
            {

               return currentSeparators.Concat(new[] { newSeparatorString }).ToArray();
            }
        }
    }
}
