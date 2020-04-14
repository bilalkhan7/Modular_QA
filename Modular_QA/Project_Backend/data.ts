export var jsondata =
{
	"account":{
	"condition": "and",
	"rules": [
	  {
		"field": "age",
		"operator": "<=",
		"entity": "physical"
	  },
	  {
		"field": "birthday",
		"operator": "=",
		"value": "2020-04-06T12:23:29.201Z",
		"entity": "nonphysical"
	  },
	  {
		"condition": "or",
		"rules": [
		  {
			"field": "gender",
			"operator": "=",
			"entity": "physical"
		  },
		  {
			"field": "occupation",
			"operator": "in",
			"entity": "nonphysical"
		  },
		  {
			"field": "school",
			"operator": "is null",
			"entity": "nonphysical"
		  },
		  {
			"field": "notes",
			"operator": "=",
			"entity": "nonphysical"
		  },
		  {
			"condition": "and",
			"rules": []
		  }
		]
	  }
	]
  },
  
  "customer":{
  
  "condition": "and",
	"rules": [
	  {
		"field": "age",
		"operator": "<=",
		"entity": "physical"
	  },
	  {
		"field": "birthday",
		"operator": "=",
		"value": "2020-04-06T12:23:29.201Z",
		"entity": "nonphysical"
	  },
	  {
		"condition": "or",
		"rules": [
		  {
			"field": "gender",
			"operator": "=",
			"entity": "physical"
		  },
		  {
			"field": "occupation",
			"operator": "in",
			"entity": "nonphysical"
		  },
		  {
			"field": "school",
			"operator": "is null",
			"entity": "nonphysical"
		  },
		  {
			"field": "notes",
			"operator": "=",
			"entity": "nonphysical"
		  },
		  {
			"condition": "and",
			"rules": []
		  }
		]
	  }
	]
	
  }
  
  }

export var sqldata = `SELECT t.table_name,array_agg(c.column_name::text) as attributes, array_agg(c.data_type::text) as data_types 
FROM information_schema.tables t
inner join information_schema.columns c on t.table_name = c.table_name 
WHERE t.table_schema = 'public' AND t.table_type= 'BASE TABLE' AND c.table_schema = 'public'
GROUP BY t.table_name;`