# import sys, json
# from collections import Counter
# import pandas as pd  
# with open('data.json', encoding='utf-8') as fh:
#     data = json.load(fh)

# #defining columns
# cols =["table","condition","field","operator","value"]
# #creating main dataframe for back-end
# main_frame = pd.DataFrame(columns=cols)

# #loop through all the main-keys(tables) from the JSON recieved

# for each_key in list(data.keys()):
    
#     #sample is variable which holds the value from the given key 
#     #updated as loop goes through the JSON tree
#     sample = data[each_key]
    
#     #loop for travelling through tree structure/ tunneling down
#     while 1>0:
        
#         #checks if the sample has list of rules or not
#         if len(sample['rules'])>0:
            
#             #checks if key named "rules" available or not in the sample
#             if 'rules' in list(sample.keys()):
                 
#                 #loop for interation on list of rules, except the last value as it is for new dictionary within JSON(branching)    
#                 for each in sample['rules'][:-1]:
                    
#                     #checks if key named "value" available or not in the sample
#                     if "value" in list(each.keys()):
                        
#                         #this temp dataframe is created as one row to append to the main dataframe
#                         temp = pd.DataFrame([[str(each_key),
#                                               str(sample['condition']),
#                                               str(each['field']),
#                                               str(each['operator']),
#                                               str(each['value'])
#                                              ]],
#                                             columns=cols)

#                         #appending temp dataframe to main dataframe
#                         main_frame = main_frame.append(temp,ignore_index=True,verify_integrity=True)

                
#                 #updating current sample to new sample/ tunneling down
#                 sample = list(sample['rules'])[-1]
        
#         #if current sample does not have list of rules it breaks the tunneling loop
#         else:
#             #adding "" to the values
#             main_frame['value'] = "\"" + main_frame['value'] + "\""
#             #converting all the conditions to uppercase
#             main_frame['condition'] = main_frame['condition'].str.upper()
#             break
                        
# #Labelling the tables
# #defining columns
# cols =["table","reference"]
# #creating labelld tables list for back-end
# labelld_tables = pd.DataFrame(columns=cols)

# #copying table names from main_frame and removing the duplicates and reseting index
# labelld_tables["table"] = main_frame['table'].drop_duplicates()
# labelld_tables.reset_index(drop=True,inplace=True)

# #asigning each table an alphabate 
# for each_table in list(labelld_tables['table'].index):
    
#     if each_table>122:
#         #write an error message here
#         break
#     labelld_tables['reference'].iloc[each_table] = chr(each_table+97)

# # checking if there is only one table available for query
# if len(data.keys())<=2:
    
#     #this is a part of the query, it contains name of tables separated by coma
#     col_list = ""

#     #list of keywords which can be used in query
#     keywords = ["SELECT "," FROM "," WHERE "]
    
#     #starting the query with "select"
#     query = keywords[0]
    
#     #loop to append column names to col_list
#     for column in main_frame['field']:
#         col_list = col_list + str(column) + ","

#     #removing the last coma from the col_list
#     col_list = col_list[:-1]
    
#     #adding other kwywords and table name
#     query = query + col_list + keywords[1] + str(list(main_frame["table"])[0]) + keywords[2]
    
#     #loop to append conditions
#     for row_number in list(main_frame.index):
        
#         if row_number==0:
#             for each in list(main_frame[['field','operator','value']].iloc[row_number]):
#                 query = query + " "+ each
#         else:
#             for each in list(main_frame[['condition','field','operator','value']].iloc[row_number]):
#                 query = query + " "+ each

#     #ending query with ":"
#     query = query+ ";"

#     print("Generated Query:"+"\n"+query)
