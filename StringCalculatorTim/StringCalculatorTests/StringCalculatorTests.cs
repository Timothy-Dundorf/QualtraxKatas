using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StringCalculator;

namespace StringCalculatorTests
{
    [TestClass]
    public class StringCalculatorTests
    {
        private Calculator calculator;

        [TestInitialize]
        public void Initialize()
        {
            this.calculator = new Calculator();

        }

        [TestMethod]
        public void TestAddEmptyString()
        {
            var sum = calculator.Add(String.Empty);

            Assert.AreEqual(0, sum);
        }

        [TestMethod]
        public void TestAddOne()
        {
            var sum = calculator.Add("1");

            Assert.AreEqual(1, sum);
        }

        [TestMethod]
        public void TestAddOneAndTwo()
        {
            var sum = calculator.Add("1,2");

            Assert.AreEqual(3, sum);
        }

        [TestMethod]
        public void TestAddOneTwoThree()
        {
            var sum = calculator.Add("1,2,3");

            Assert.AreEqual(6, sum);
        }

        /// <summary>
        /// I solved this problem by creating a char array with space and comma to input into the parameter that converts the string into an array.
        /// </summary>
        [TestMethod]
        public void TestAddNewLineSeperated()
        {
            var sum = calculator.Add("1 2");

            Assert.AreEqual(3, sum);
        }

        [TestMethod]
        public void TestSupportDifferentDelimeter()
        {
            var sum = calculator.Add("//; 1;2");

            Assert.AreEqual(3, sum);
        }

        [TestMethod]
        public void TestSupportDifferentAndVariedDelimeters()
        {
            var sum = calculator.Add("//; 1;2,3 1");

            Assert.AreEqual(7, sum);
        }

        [TestMethod]
        public void TestNegativeNumbersThrowException()
        {
            //I don't know how to do exceptions so I will wait to work with Tim Allen. 
        }

        /// <summary>
        /// Step 6: Completed by sorting descending the array of split numbers and then skipping while greater than 1000. Then you sum what is left.
        /// </summary>
        [TestMethod]
        public void TestNumbersTooBigIgnored()
        {
            var sum = calculator.Add("1,1001");

            Assert.AreEqual(1, sum);
        }

        [TestMethod]
        public void TestDelimiterOfAnyLength()
        {
            var sum = calculator.Add("//[***] 1***2***3");

            Assert.AreEqual(6, sum);
        }
    }
}
