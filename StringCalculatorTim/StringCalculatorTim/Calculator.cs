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

        /// <summary>
        /// Adds together a string in a predefined format with string numerals delimited by user defined or default separators. Negatives numerals will throw an
        /// exception and print a descending list of all negative numbers. All numerals over 1000 will be ignored with the sum of all other numbers being returned.
        /// </summary>
        /// <param name="stringNumbers"></param>
        /// Acceptable format one requires only string numeral delimited with deault separators as defined in the project variable defaultSeparators.
        /// Acceptable format two requires user to input one additional delimiter following two forward slash characters and followed by a space ex "//; 1;2"
        /// Acceptable format three allows user to input any number of varied and anylength delimiters in the following format ex "//[$$$][**] 1$$$2**4"
        ///
        /// <returns></returns>
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
            negativeNumberExceptionChecker(splitNumbersSortedDescending);
            //This function skips over the elements in the sorted descending array while they are greater than 1000 and then sums the rest. 
            //TODO remove skip while and hard coded 1000 rule. Replace with where soft coded. Do same for negative rule. Remove the the order by descending.
            // Also figure out why this isn't working. how does skip while really work?
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

        private void negativeNumberExceptionChecker(IOrderedEnumerable<string> splitNumbersSortedDescending)
        {

            var negativeNumberString = splitNumbersSortedDescending.Where(n => Convert.ToInt32(n) < 0);

            if (negativeNumberString.Any())
            {
                var message = String.Join(", ", negativeNumberString);
                throw new Exception(message);
            }

        }
    }
}
