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

            var splitNumbers = stringNumbers.Split(',');

            return splitNumbers.Sum(o => Convert.ToInt32(o));      
        }
    }
}
