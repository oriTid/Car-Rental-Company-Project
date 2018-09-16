using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _02_BOL
{
    public class Id_Validations : ValidationAttribute
    {
        public override bool IsValid(object param)
        {
            string Id = param.ToString();
            List<int> FirstRow = new List<int>();
            foreach (char item in Id)
            {
                FirstRow.Add(int.Parse(item.ToString()));
            }
            List<int> SecondRow = new List<int>();
            for (int i = 0; i < Id.Length; i++)
            {
                if (i % 2 == 0)
                {
                    SecondRow.Add(1);
                }
                else
                {
                    SecondRow.Add(2);
                }
            }
            List<int> ThiredRow = new List<int>();
            for (int i = 0; i < Id.Length; i++)
            {
                ThiredRow.Add(FirstRow[i] * SecondRow[i]);
            }

            List<int> foutrhdRow = new List<int>();

            for (int i = 0; i < Id.Length; i++)
            {
                if (ThiredRow[i] > 9)
                {
                    int firstDig = (ThiredRow[i] / 10);
                    int secondDig = ThiredRow[i] % 10;
                    foutrhdRow.Add(firstDig + secondDig);
                }
                else
                {
                    foutrhdRow.Add(ThiredRow[i]);
                }
            }

            int results = 0;
            foreach (int item in foutrhdRow)
            {
                results += item;
            }
            if (results % 10 == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
