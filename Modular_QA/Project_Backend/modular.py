# List of imports/libraries
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, request, redirect, url_for, flash,send_from_directory,jsonify
import json,sys
from werkzeug.utils import secure_filename
from collections import Counter
import pandas as pd
import urllib.request


global response_json
response_json = {'query':'',
                 'error':'',
                 'data_types': {}}

response_json = json.dumps(response_json)
response_json = json.loads(response_json)

#To get common element from two lists
def check_lists(list1,list2):
    return list(set(list1)&set(list2))

#Builds Query
def build_query(data,data2):

    
    with open('output.json', encoding='utf-8') as fx:
        data = json.load(fx)

    #getting main body from the POST argument
    data = data['jsondata'][0]

    #defining columns for main_frame
    cols =["table","condition","field","operator","value"]

    #creating main_frame for back-end
    main_frame = pd.DataFrame(columns=cols)

    #loop through all the main-keys(tables) from the JSON recieved
    for each_key in list(data.keys()):
        
        #sample is variable which holds the value from the given key 
        #updated as loop goes through the JSON tree
        sample = data[each_key]

        #loop for travelling through tree structure/ tunneling down
        while 1>0:
            
            #checks if the sample has list of rules or not
            if len(sample['rules'])>0:
                
                #checks if key named "rules" available or not in the sample
                if 'rules' in list(sample.keys()):
                     
                    #loop for interation on list of rules, except the last value as it is for new dictionary within JSON(branching)    
                    for each in sample['rules'][:-1]:
                        
                        #checks if key named "value" available or not in the sample
                        if "value" in list(each.keys()):
                            
                            #this temp dataframe is created as one row to append to the main dataframe
                            temp = pd.DataFrame([[str(each_key),
                                                  str(sample['condition']),
                                                  str(each['field']),
                                                  str(each['operator']),
                                                  str(each['value'])
                                                 ]],
                                                columns=cols)

                            #appending temp dataframe to main dataframe
                            main_frame = main_frame.append(temp,ignore_index=True,verify_integrity=True)

                    
                    #updating current sample to new sample/ tunneling down
                    sample = list(sample['rules'])[-1]
            
            #if current sample does not have list of rules it breaks the tunneling loop
            else:
                break
    #return str(",".join(main_frame['table']))
    # adding "" to the values
    main_frame['value'] = "\'" + main_frame['value'] + "\'"
    #converting all the conditions to uppercase
    main_frame['condition'] = main_frame['condition'].str.upper()

    #Labelling the tables
    #defining columns
    cols =["table","reference"]

    #creating labelld tables list for back-end
    labelld_tables = pd.DataFrame(columns=cols)

    #copying table names from main_frame and removing the duplicates and reseting index
    labelld_tables["table"] = main_frame['table'].drop_duplicates()
    labelld_tables.reset_index(drop=True,inplace=True)

    #asigning each table an alphabate 
    for each_table in list(labelld_tables['table'].index):

        #If label is morethat letter "z"
        if each_table>122:
            #write an error message here
            break

        #Label the table according to its order
        labelld_tables['reference'].iloc[each_table] = chr(each_table+97)

    #Appending the labels with main_frame
    main_frame = pd.merge(main_frame,labelld_tables,how='left', on=['table'])

    # checking if there is only one table available for query
    if len(data.keys())<=1:
        
        #this is a part of the query, it contains name of tables separated by coma
        col_list = ""

        #list of keywords which can be used in query
        keywords = ["SELECT "," FROM "," WHERE "]
        
        #starting the query with "select"
        query = keywords[0]
        
        #loop to append column names to col_list
        for column in main_frame['field']:
            col_list = col_list + str(column) + ","

        #removing the last coma from the col_list
        col_list = col_list[:-1]
        
        #adding other kwywords and table name
        query = query + col_list + keywords[1] + str(list(main_frame["table"])[0]) + keywords[2]
        
        #loop to append conditions
        for row_number in list(main_frame.index):

            #First row does not have any condition
            if row_number==0:
                for each in list(main_frame[['field','operator','value']].iloc[row_number]):
                    query = query + " "+ each

            #Otherwise add conditions after WHERE clause
            else:
                for each in list(main_frame[['condition','field','operator','value']].iloc[row_number]):
                    query = query + " "+ each

        #ending query with ":"
        query = query+ ";"

        response_json['query'] = str(query)
        return response_json
        
    # query with more than two table
    else:
        #loop for writing joins part of the query
        #list of keywords which can be used in query
        keywords = ["SELECT "," FROM "," WHERE "," JOIN "," ON ",' GROUP BY']

        #List of tables with unique names
        tables_list = main_frame['table'].drop_duplicates().tolist()

        #query_part is a sub-part of the query.
        query_part = " "
        temp = []

        #Appending names of fields with table reference.
        for x in range(len(tables_list)):
            for y in range(x+1,len(tables_list)): 

                table1,table2 = tables_list[x],tables_list[y]

                if len(join_frame.loc[tables_list[x],tables_list[y]]) >0:
                    temp+=[table1,table2]
                    l1 = str(main_frame[main_frame.table==table1]['reference'].drop_duplicates().tolist()[0])
                    l2 = str(main_frame[main_frame.table==table2]['reference'].drop_duplicates().tolist()[0])

                    query_part = query_part + keywords[3] + tables_list[x+1] + " "+ str(main_frame[main_frame.table==tables_list[x+1]]['reference'].drop_duplicates().tolist()[0]) + keywords[4] +l1+'.'+ str(join_frame.loc[table1,table2][0]) +"=" +l2+'.'+ str(join_frame.loc[table1,table2][0])

        #editing main_fram according to possible join
        for each_table in list(set(tables_list) - set(temp)):
            main_frame = main_frame[main_frame.table!=each_table]

        #Reset index after changing the main_frame
        main_frame.reset_index(drop=True,inplace=True)

        #this is a part of the query, it contains name of tables separated by coma
        col_list = ""
        
        #starting the query with "select"
        query = keywords[0]

        #loop to append column names to col_list
        for row_number in list(main_frame.index):
            col_list = col_list + main_frame.iloc[row_number]['reference'] + '.' + main_frame.iloc[row_number]['field'] + ','

        #removing the last coma from the col_list
        #app.logger(col_lists)
        col_list = col_list[:-1]
        
        #adding other kwywords and table name
        query = query +' '+ col_list + keywords[1] + str(list(main_frame["table"])[0]) + " "+ str(list(main_frame["reference"])[0])
          
        #add "WHERE" clause
        query = query + query_part + keywords[2]
        
        #loop to append conditions
        for row_number in list(main_frame.index):
            
            #if it is first row than skip the condition
            if row_number==0:
                query = query + main_frame['reference'].iloc[row_number] +'.'+main_frame['field'].iloc[row_number]
                for each in list(main_frame[['operator','value']].iloc[row_number]):           
                    query = query + " "+ each

            #else append condition
            else:
                query = query + ' '+main_frame['condition'].iloc[row_number]+" "+ main_frame['reference'].iloc[row_number] +'.'+main_frame['field'].iloc[row_number]
                for each in list(main_frame[['operator','value']].iloc[row_number]):
                    query = query + " "+ each

        #ending query with ":"
        query = query+ ";"

        response_json['query'] = str(query)
        return response_json


#Creating FLASK Application
app = Flask(__name__)

#reading data from the POST request and calling the
@app.route("/sql_generate", methods=['POST','GET'])
def generate_query():


    if request.method == 'POST':
        data = request.json
    data = json.dumps(data)
    data = json.dumps(data)

    # API endpoint will be here
    link = "http://localhost:3000/table_with_attributes"

    with urllib.request.urlopen(link) as url:
        data2 = json.loads(url.read().decode())

    data = "".join([each for each in data])
    data = json.loads(data)

    with open("output.json", "w") as text_file:
        text_file.write(data)
        text_file.close()
    data = jsonify(data)

    return build_query(data,data2)

@app.route("/table_with_attributes")
def calling_tables():
    global data2,join_frame,table_frame

    # API endpoint will be here
    link = "http://localhost:3000/table_with_attributes"

    with urllib.request.urlopen(link) as url:
        data2 = json.loads(url.read().decode())

    # for table_frame
    cols = ['table', 'columns']

    # creating table info. dataframe for back-end
    table_frame = pd.DataFrame(columns=cols)

    # loop through all the main-keys(tables) from the JSON recieved
    for each in list(data2):
        # this temp dataframe is created as one row to append to the main dataframe
        temp = pd.DataFrame([[str(each['table']), each['columns']]], columns=cols)

        # appending temp dataframe to main dataframe
        table_frame = table_frame.append(temp, ignore_index=True, verify_integrity=True)

    # Creating the join_frame
    join_frame = pd.DataFrame(columns=list(table_frame['table']), index=list(table_frame['table']))

    # Filling join_frame wth value which is the key on the joins are going to be
    for x in list(table_frame['table']):
        for y in list(table_frame['table']):
            join_frame.loc[x, y] = check_lists(table_frame[table_frame.table == x]['columns'].tolist()[0],
                                               table_frame[table_frame.table == y]['columns'].tolist()[0])

    return "OK"

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)