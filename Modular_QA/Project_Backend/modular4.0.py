''' 
This is a final version working with caching.

Node server is in the loop.

Error-handling is added.

'''


# List of imports/libraries
import logging

import psycopg2

from logging.handlers import RotatingFileHandler

from flask import Flask, request, redirect, url_for, flash, send_from_directory, jsonify

from flask_caching import Cache

from flask_cors import CORS

import json

import sys

from werkzeug.utils import secure_filename

from collections import Counter

import pandas as pd

import urllib.request

# --- End of import list ---

# Making connection with Database
conn = psycopg2.connect("dbname=foodmart user=postgres password=postgres")

# Open a cursor to perform database operations
cur = conn.cursor()


# Class structure
class main_class:

    # variable for main_frame
    mframe = None

    # variable for labelled_tables
    lframe = None

    # variable for table_frame
    tframe = None   

    # variable for join_frame
    jframe = None

    # variable for data
    request_data = None

    # variable for data2
    data2 = []


    # Constructor 
    def __init__(self):

        global flag

        app.logger.info("initializing an object")

        self.read_POST()
        self.calling_tables()
        
    # To get common element from two lists
    def __check_lists(self,list1, list2):

        return list(set(list1) & set(list2))

    # --- End of the function check_lists ---

    # This function get the information of all the tables in the database
    def calling_tables(self):

        # Execute the query to get info about tables and its columns
        cur.execute("""SELECT t.table_name as table,array_agg(c.column_name::text) as columns 
                      FROM information_schema.tables t
                      inner join information_schema.columns c on t.table_name = c.table_name 
                      WHERE t.table_schema = 'public' AND t.table_type= 'BASE TABLE' AND c.table_schema = 'public'
                      GROUP BY t.table_name;""")

        # fetching the data and assigning to data2   
        data2 = cur.fetchall()

        response_json = []

        for each in data2:
            temp = {"table": None,"columns": None}

            c = 0
            for each_key in list(temp.keys()):
                temp[each_key] = each[c]
                c+=1
        
            response_json.append(temp)

        #app.logger.info(response_json)   

        self.data2 = response_json

        # deleting localc variables
        del data2        

        return self

    # --- End of the function calling_tables ---

    # This function reads POST request from front-end
    def read_POST(self):

        # Checks if the request method is POST or not
        if request.method == "POST":
            data = request.json


        self.request_data  = dict((key,d[key]) for d in data for key in d)

        #app.logger.info(self.request_data)   

        # deleting localc variables
        del data

        return self 

    # --- End of the class structure ---


    # Creates main_frame
    def generate_main_frame(self):

        app.logger.info("generate_main_frame is called")

        # Assigning object data to local variable
        data = self.request_data

        # Defining columns for main_frame
        cols = ["table", "condition", "field", "operator", "value"]

        # Creating main_frame for back-end
        main_frame = pd.DataFrame(columns=cols)

        # Loop through all the main-keys(tables) from the JSON recieved
        for each_key in list(data.keys()):

            # sample is variable which holds the value from the given key 
            # updated as loop goes through the JSON tree
            sample = data[each_key]

            # Loop for travelling through tree structure/ tunneling down
            while 1>0:

                # Checks if the sample has list of rules or not
                if len(sample['rules'])>0:

                    # Checks if key named "rules" available or not in the sample
                    if 'rules' in list(sample.keys()):

                        # Loop for interation on list of rules, except the last value as it is for new dictionary within JSON(branching)    
                        for each in sample['rules'][:-1]:

                            # Checks if key named "value" available or not in the sample
                            if "value" in list(each.keys()):

                                # This temp dataframe is created as one row to append to the main dataframe
                                temp = pd.DataFrame([[str(each_key),

                                                      str(sample['condition']),

                                                      str(each['field']),

                                                      str(each['operator']),

                                                      str(each['value'])

                                                     ]],

                                                    columns=cols)

                                # Appending temp dataframe to main dataframe
                                main_frame = main_frame.append(temp,ignore_index=True,verify_integrity=True)

                        # Updating current sample to new sample/ tunneling down
                        sample = list(sample['rules'])[-1]          

                # If current sample does not have list of rules it breaks the tunneling loop
                else:
                    break

            # --- End of while loop ---

        # --- End of for loop ---


        # Adding "" to the values
        main_frame['value'] = "\'" + main_frame['value'] + "\'"

        # Converting all the conditions to uppercase
        main_frame['condition'] = main_frame['condition'].str.upper()

        #app.logger.info(len(main_frame['table']))

        self.mframe = main_frame

        # deleting localc variables
        del data
        del main_frame
        del cols
        del sample
        del temp

        return self

    # --- End of the function generate_main_frame ---


    # Labelling the tables
    def generate_reference_table(self):
        app.logger.info("generate_reference_table is called")

        # Assigning data to local variable
        main_frame = self.mframe
        data2 = self.data2

        # Defining columns for labelled_tables
        cols =["table","reference"]

        # Creating labelld tables list for back-end
        labelled_tables = pd.DataFrame(columns=cols)

        # Copying table names from main_frame and removing the duplicates and reseting index
        labelled_tables["table"] = main_frame['table'].drop_duplicates()
        labelled_tables.reset_index(drop=True,inplace=True)

        # Asigning each table an alphabet
        for each_table in list(labelled_tables['table'].index):

            # If label is more than letter "z"
            if each_table + 97 >122:

                # Write an error message here
                break

            # Label the table according to its order
            labelled_tables['reference'].iloc[each_table] = chr(each_table+97)

        self.lframe = labelled_tables

        # deleting localc variables
        del main_frame
        del data2
        del labelled_tables
        del cols

        return self

    # --- End of the function generate_reference_table ---

    def generate_table_frame(self):

        data2 = self.data2

        # Defining columns for table_frame
        cols = ['table', 'columns']

        # Creating table info. dataframe for back-end
        table_frame = pd.DataFrame(columns=cols)

        # Loop through all the main-keys(tables) from the JSON recieved
        for each in list(data2):

            # This temp dataframe is created as one row to append to the main dataframe
            temp = pd.DataFrame([[str(each['table']), each['columns']]], columns=cols)

            # Appending temp dataframe to main dataframe
            table_frame = table_frame.append(temp, ignore_index=True, verify_integrity=True)

        self.tframe = table_frame

        app.logger.info(self.tframe)

        # deleting localc variables
        del table_frame
        del data2
        del cols

        return self 

    # --- End of the function generate_table_frame ---


    # Generates join_frame
    def generate_join_frame(self):
        app.logger.info("generate_join_frame is called")

        # Assigning data to local variable
        table_frame = self.tframe

        # Creating the join_frame
        join_frame = pd.DataFrame(columns=list(table_frame['table']), index=list(table_frame['table']))

        # Filling join_frame with common ID as a cell value
        for x in list(table_frame['table']):

            for y in list(table_frame['table']):

                join_frame.loc[x, y] = self.__check_lists(table_frame[table_frame.table == x]['columns'].tolist()[0],

                                                   table_frame[table_frame.table == y]['columns'].tolist()[0])

        self.jframe = join_frame

        # deleting localc variables
        del table_frame
        del join_frame

        return self

    # --- End of the function generate_join_frame ---


    # Builds Query
    def build_query(self):
        app.logger.info("build_query is called")

        # Assigning data to local variables
        main_frame = self.mframe
        labelled_tables = self.lframe
        join_frame = self.jframe
        data = self.request_data

        # Appending the labels with main_frame
        main_frame = pd.merge(main_frame,labelled_tables,how='left', on=['table'])

        app.logger.info(data)

        # Checking if there is only one table available for query
        if len(data.keys())==1:
            app.logger.info("If condition is checked")

            # This is a part of the query, it contains name of columns separated by coma
            col_list = ""

            # List of keywords which can be used in query
            keywords = ["SELECT "," FROM "," WHERE "]

            # Starting the query with "select"
            query = keywords[0]

            # Loop to append column names to col_list
            for column in main_frame['field']:
                col_list = col_list + str(column) + ","

            # --- End of the for loop ---

            # Removing the last coma from the col_list
            col_list = col_list[:-1]

            # Adding other keywords and table name
            query = query + col_list + keywords[1] + str(list(main_frame["table"])[0]) + keywords[2]    

            # Loop to append Where-clauses
            for row_number in list(main_frame.index):

                # Skipping first row to avoid first condition
                if row_number==0:

                    for each in list(main_frame[['field','operator','value']].iloc[row_number]):
                        query = query + " "+ each

                    # --- End of the for loop ---

                # Otherwise add conditions after WHERE clause
                else:

                    for each in list(main_frame[['condition','field','operator','value']].iloc[row_number]):
                        query = query + " "+ each

                    # --- End of the for loop ---

            # --- End of the for loop ---

            # Ending query with ";"
            query = query+ ";"

            app.logger.info("query is generated for one table")
            app.logger.info(query)

            # Assigning values to response_json
            response_json['query'] = str(query)

            # Returning response_json
            return response_json

        # Query with more than one table
        else:
            app.logger.info("else is checked")

            # loop for writing joins part of the query

            # List of keywords which can be used in query
            keywords = ["SELECT "," FROM "," WHERE "," JOIN "," ON ",' GROUP BY']

            # List of tables with unique names
            tables_list = main_frame['table'].drop_duplicates().tolist()

            # Query_part is a sub-part of the query.
            query_part = " "

            # Temp variable for creating a row 
            temp = []

            # Checks if two tables are available for the query
            if len(tables_list)==2:

                x,y = 0,1
                table1,table2 = tables_list[x],tables_list[y]       

                # Checks if join is possible or not
                if len(join_frame.loc[tables_list[x],tables_list[y]]) >0:

                            temp+=[table1,table2]

                            l1 = str(main_frame[main_frame.table==table1]['reference'].drop_duplicates().tolist()[0])

                            l2 = str(main_frame[main_frame.table==table2]['reference'].drop_duplicates().tolist()[0])

                            if len(data.keys())>2:
                                response_json['error_status'] = True                            
                                response_json['error'] = "Query is generated for two tables("+",".join(tables_list)+") instead of " + len(data.keys()) + " tables."

                            app.logger.info("query is generated for two tables")

                            query_part = query_part + keywords[3] + tables_list[x+1] + " "+ str(main_frame[main_frame.table==tables_list[x+1]]['reference'].drop_duplicates().tolist()[0]) + keywords[4] +l1+'.'+ str(join_frame.loc[table1,table2][0]) +"=" +l2+'.'+ str(join_frame.loc[table1,table2][0])

                # If join is not possible
                else:
                    app.logger.info("join not possible")

                    # Assigning values to response_json
                    response_json['error'] = "Join is not possible"
                    response_json['error_status'] = True

                    # Returning response_json
                    return response_json

            # More than two tables are available for the query          
            else:   

                # Appending names of fields with table reference.
                for x in range(len(tables_list)):

                    # Checking all combinations for possible joins using join_frame
                    for y in range(x+1,len(tables_list)): 
                        table1,table2 = tables_list[x],tables_list[y]

                        # Checks if the join is possible.
                        if len(join_frame.loc[tables_list[x],tables_list[y]]) >0:

                            temp+=[table1,table2]
                            l1 = str(main_frame[main_frame.table==table1]['reference'].drop_duplicates().tolist()[0])
                            l2 = str(main_frame[main_frame.table==table2]['reference'].drop_duplicates().tolist()[0])

                            app.logger.info("query is generated for multiple tables")

                            query_part = query_part + keywords[3] + tables_list[x+1] + " "+ str(main_frame[main_frame.table==tables_list[x+1]]['reference'].drop_duplicates().tolist()[0]) + keywords[4] +l1+'.'+ str(join_frame.loc[table1,table2][0]) +"=" +l2+'.'+ str(join_frame.loc[table1,table2][0])

                    # --- End of the for loop ---

                # --- End of the for loop ---

            # Removing the tables which can not be joined
            for each_table in list(set(tables_list) - set(temp)):
                main_frame = main_frame[main_frame.table!=each_table]

            # Checks if number of tables in the query is less than requested
            if len(main_frame['table'].drop_duplicates().tolist()) < len(data.keys()):

                # Writing error and setting the error_status
                response_json['error_status'] = True
                response_json['error'] = "Query is generated for "+str(len(main_frame['table'].drop_duplicates().tolist()))+" tables("+",".join(main_frame['table'].drop_duplicates().tolist())+") instead of " + str(len(data.keys())) + " tables."

            # Checks if no join possible among multiple tables      
            if len(main_frame['table'].drop_duplicates().tolist()) == 0 :
                app.logger.info("join not possible")

                # Writing error and setting the error_status                
                response_json['error'] = "Join is not possible"
                response_json['error_status'] = True

                # Returning response_json
                return response_json

            # Reset index after changing the main_frame
            main_frame.reset_index(drop=True,inplace=True)

            # This is a part of the query, it contains name of tables separated by coma
            col_list = ""

            # Start of the query for multiple tables
            # Starting the query with "select"
            query = keywords[0]

            # Loop to append column names to col_list
            for row_number in list(main_frame.index):

                # Temporary object which will be appended in the columns_array in response_json
                temp_column = {"column_name":""}            
                temp_column['column_name']=str(main_frame.iloc[row_number]['reference'] + '_' + main_frame.iloc[row_number]['field'])
                response_json['columns_array'].append(temp_column)

                # Creating column list with its reference and changes column name to <reference>_<column_name>
                col_list = col_list + main_frame.iloc[row_number]['reference'] + '.' + main_frame.iloc[row_number]['field'] +" as "+ main_frame.iloc[row_number]['reference'] + '_' + main_frame.iloc[row_number]['field'] +','

            # --- End of the for loop ---

            # Removing the last coma from the col_list
            col_list = col_list[:-1]

            # Adding other kwywords and table name
            query = query +' '+ col_list + keywords[1] + str(list(main_frame["table"])[0]) + " "+ str(list(main_frame["reference"])[0])

            # Add "WHERE" keyword
            query = query + query_part + keywords[2]

            # Loop to append Where-clauses
            for row_number in list(main_frame.index):

                # Skipping first row to avoid first condition
                if row_number==0:

                    # Adding first table with its reference
                    query = query + main_frame['reference'].iloc[row_number] +'.'+main_frame['field'].iloc[row_number]

                    # Appending first where-clause without any condition
                    for each in list(main_frame[['operator','value']].iloc[row_number]):           
                        query = query + " "+ each

                    # --- End of the for loop ---

                # Else append conditions
                else:

                    # query = query + ' '+main_frame['condition'].iloc[row_number]+" "+ main_frame['reference'].iloc[row_number] +'.'+main_frame['field'].iloc[row_number]

                    # Appending first where-clause with any condition               
                    for each in list(main_frame[['condition','field','operator','value']].iloc[row_number]):
                        query = query + " "+ each

                    # --- End of the for loop ---

            # ending query with ";"
            query = query+ ";"

            # Assigning values to response_json
            response_json['query'] = str(query)

            app.logger.info(query)


            # Execute the generated query
            cur.execute("{0}".format(query))

            col_keys = []
            col_keys = [each['column_name'] for each in response_json['columns_array']]


            temp = {}

            for x in col_keys:
                temp[x] = None

            rows = cur.fetchall()

            app.logger.info(rows)

            app.logger.info(col_keys)


            resp = []

            for each in rows:

                temp = {}
                for x in range(len(col_keys)):

                    temp[col_keys[x]] = str(each[x])

                resp.append(temp)


            app.logger.info(query)

            response_json['data'] = resp
            # deleting localc variables
            del data
            del main_frame
            del labelled_tables
            del join_frame
            del query
            del query_part
            del col_list
            del keywords
            del temp
            del tables_list

            # Clearing the cache when sends the response_json to front
            cache.clear()


            # Returning response_json
            return response_json

    # --- End of the function build_query ---





# Creating FLASK Application
app = Flask(__name__)

# Adding Cross Origin Resource Share (CORS)
cors = CORS(app)

# Creating cache for the application
cache = Cache(app, config={'CACHE_TYPE':'simple','CACHE_DEFAULT_TIMEOUT':"4"})


# Reading data from the POST request and calling the build_query.
@app.route("/sql_generate", methods=['POST','GET'])
@cache.cached(timeout=4)
def main():
    app.logger.info("main is called")

    # Making response_json global
    global response_json

    # Structure of API response
    response_json = {'query': '',

                 'error': '',

                 "data": None,

                 'columns_array': [],
                 'error_status': False }

    # --- end of structure ---

    # Creates blank json
    response_json = json.dumps(response_json)
    response_json = json.loads(response_json)

    # Class object is created
    my_object = main_class()

    my_object.generate_main_frame()
    my_object.generate_reference_table()
    my_object.generate_table_frame()
    my_object.generate_join_frame()

    response_json = my_object.build_query()


    # Calling build_query after copying all necessary data to class object
    return response_json

# --- End of the function generate_query ---

# Reading data from the GET request and calling the build_query.
@app.route("/table_attributes", methods = ['GET'])
def table_attributes():
    # Execute the query to get info about tables and its columns
    cur.execute("""SELECT t.table_name,array_agg(c.column_name::text) as field, array_agg(c.data_type::text) as data_type 
            FROM information_schema.tables t
            inner join information_schema.columns c on t.table_name = c.table_name 
            WHERE t.table_schema = 'public' AND t.table_type= 'BASE TABLE' AND c.table_schema = 'public'
            GROUP BY t.table_name;""")

    # fetching and returning the table_with_attributes
    data = cur.fetchall()

    response = []

    for each in data:

        temp = {"table_name": None,"field": None,"data_type": None}

        c = 0
        for each_key in list(temp.keys()):
            temp[each_key] = each[c]
            c+=1
        
        response.append(temp)

    app.logger.info(response)

    response = json.dumps(response,sort_keys = False)

    return response


# Running app as main function.
if __name__ == '__main__':

    app.run(host='0.0.0.0',debug=True)
