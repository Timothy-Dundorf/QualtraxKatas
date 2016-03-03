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
            if (String.IsNullOrEmpty(stringNumbers))
                return 0;

            var separators = new String[] { " ", "," };
            String[] newSeperatorArray;


            if (stringNumbers[0] == '/')
            {
                var endOfDelimiterString = stringNumbers.IndexOf(' ');
                var newSeperatorString = stringNumbers.Substring(2, endOfDelimiterString - 2);
                var newSeperatorChar = stringNumbers[2];
                stringNumbers = stringNumbers.Remove(0, endOfDelimiterString + 1);

                if (newSeperatorString[0].Equals('['))
                {
                    newSeperatorString = newSeperatorString.Trim(new char[] { '[', ']' });
                    stringNumbers = stringNumbers.Replace(newSeperatorString, ",");

                    if(newSeperatorString.Contains(']'))
                    {
                        newSeperatorString = newSeperatorString.Replace("][", ",");
                        newSeperatorArray = newSeperatorString.Split(',');
                        separators = separators.Concat(newSeperatorArray).ToArray();
                    }
                }
                else
                {
                    separators = separators.Concat(new[] { newSeperatorChar.ToString() }).ToArray();
                }
            }
            
            var splitNumbersSortedDescending = stringNumbers.Split(separators, StringSplitOptions.None).OrderByDescending(o => o);

            var negativeNumberString = splitNumbersSortedDescending.Where(n => Convert.ToInt32(n) < 0);

            if (!String.IsNullOrEmpty(stringNumbers))
            {
                var message = String.Join(", ", negativeNumberString);
                throw new Exception(message);
            }

            System.Diagnostics.Debug.WriteLine(splitNumbersSortedDescending);
            //This function skips over the elements in the sorted descending array while they are greater than 1000 and then sums the rest. 
            var sumTooLargeRemoved = splitNumbersSortedDescending.SkipWhile(o => Convert.ToInt32(o) > 1000).Sum(o => Convert.ToInt32(o));

            return sumTooLargeRemoved;
        }
    }
}
