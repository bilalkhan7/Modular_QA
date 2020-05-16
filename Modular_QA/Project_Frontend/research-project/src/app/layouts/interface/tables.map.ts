export interface TablesMap {
  table_name: string;
  field?: (string)[] | null;
  data_type ?: string[] | null;
}

export interface IUserResponse {
  total: number;
  results: TablesMap[];
}


