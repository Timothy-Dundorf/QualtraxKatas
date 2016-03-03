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

            var separators = new char[] { ' ', ',' };

            if (stringNumbers[0] == '/')
            {
                var endOfDelimiterString = stringNumbers.IndexOf(' ');
                var newSeperatorString = stringNumbers.Substring(1, endOfDelimiterString - 2);
                var newSeperatorChar = stringNumbers[2];
                stringNumbers = stringNumbers.Remove(0, endOfDelimiterString + 1);

                if (newSeperatorString[0].Equals('['))
                {
                    newSeperatorString = newSeperatorString.Remove(0, 1);
                    newSeperatorString = newSeperatorString.Remove(newSeperatorString.Length - 1, 1);
                    stringNumbers = stringNumbers.Replace(newSeperatorString, ",");
                }
                else
                {

                    separators = new char[] { ' ', ',', newSeperatorChar };
                }
                

            }
            
            var splitNumbersSortedDescending = stringNumbers.Split(separators).OrderByDescending(o => o);

            //var negativeSplitNumbers = splitNumbersSortedDescending()
            System.Diagnostics.Debug.WriteLine(splitNumbersSortedDescending);
            //This function skips over the elements in the sorted descending array while they are greater than 1000 and then sums the rest. 
            var sumTooLargeRemoved = splitNumbersSortedDescending.SkipWhile(o => Convert.ToInt32(o) > 1000).Sum(o => Convert.ToInt32(o));

            return sumTooLargeRemoved;     
        }
    }
}
