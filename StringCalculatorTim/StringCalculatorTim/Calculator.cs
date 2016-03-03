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
                var newSeperator = stringNumbers[2];
                separators = new char[] { ' ', ',', newSeperator};
                stringNumbers = stringNumbers.Remove(0, 4);
            }
            var splitNumbers = stringNumbers.Split(separators);

            var splitNumbersSortedDescending = splitNumbers.OrderByDescending(o => o);

            //var negativeSplitNumbers = splitNumbersSortedDescending()
            //This function skips over the elements in the sorted descending array while they are gretaer than 1000 and then sums the rest. 
            var splitNumbersTooLargeRemoved = splitNumbersSortedDescending.SkipWhile(o => Convert.ToInt32(o) > 1000).Sum(o => Convert.ToInt32(o));

            return splitNumbersTooLargeRemoved;     
        }
    }
}
