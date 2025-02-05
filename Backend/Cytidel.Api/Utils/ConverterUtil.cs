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
    }
}
