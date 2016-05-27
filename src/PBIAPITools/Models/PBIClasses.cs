using System.Collections.Generic;

namespace PBIAPITools.Models
{
    public class Datasets
    {
        public List<Dataset> value { get; set; }
    }

    public class Dataset
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Table Tables { get; set; }
    }

    public class Tables
    {
        public List<Table> value { get; set; }
    }

    public class Table
    {
        public string Name { get; set; }
        public List<Column> Columns { get; set; }
    }

    public class Groups
    {
        public List<Group> value { get; set; }
    }

    public class Group
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class Column
    {
        public string Name { get; set; }
        public string DataType { get; set; }
    }
}