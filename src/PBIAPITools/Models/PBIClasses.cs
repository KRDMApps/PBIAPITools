namespace PBIAPITools.Models
{
    public class Datasets
    {
        public dataset[] value { get; set; }
    }

    public class dataset
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class Tables
    {
        public table[] value { get; set; }
    }

    public class table
    {
        public string Name { get; set; }
    }

    public class Groups
    {
        public group[] value { get; set; }
    }

    public class group
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}