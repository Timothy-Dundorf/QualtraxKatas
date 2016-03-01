using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeFactors
{
    public class PrimeFactors
    {
        public static List<Int32> Generate(Int32 num)
        {
            var primes = new List<Int32> { 2, 3, 5, 7 };
            var solution = new List<Int32>();

            if (num == 1)
                return solution;

            while(!primes.Contains(num))
            {
                foreach (var n in primes)
                {
                    if (0 == (num % n))
                    {
                        solution.Add(n);
                        num /= n;
                        break;
                    }
                }
            }

            solution.Add(num);
            return solution;
        }
    }
}
