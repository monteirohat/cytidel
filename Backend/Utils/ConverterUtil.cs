using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Cytidel.Api.Utils
{
    public static class ConverterUtil
    {
        public static T ToEnum<T>(this int value) where T : Enum
        {
            return (T)Enum.ToObject(typeof(T), value);
        }

        public static int GetEnumValue(this Enum item)
        {
            return Convert.ToInt32(item);
        }

        public static string GetEnumValueStr(this Enum item)
        {
            return Convert.ToInt32(item).ToString();
        }

        public static bool IsValidEnum<T>(this int value) where T : Enum
        {
            return Enum.IsDefined(typeof(T), value);
        }

        public static string GetEnumDescription<T>(this T enumValue) where T : Enum
        {
            var memberInfo = typeof(T).GetMember(enumValue.ToString());
            if (memberInfo != null && memberInfo.Length > 0)
            {
                var displayAttribute = memberInfo[0].GetCustomAttribute<DisplayAttribute>();
                if (displayAttribute != null)
                {
                    return displayAttribute.Name;
                }
            }
            return enumValue.ToString();
        }
    }
}
