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

            return splitNumbers.Sum(o => Convert.ToInt32(o));      
        }
    }
}
