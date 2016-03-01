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
    }
}
