#!/usr/bin/env

import sys
from sys import stdin
import json
from pprint import pprint
import xlwt

print 'Enter event code: '
eventCode = sys.stdin.readline().rstrip().upper()
print 'Enter event name: '
eventName = sys.stdin.readline().rstrip()

jsonData = open('../../Data/' + eventCode + '.json')
teamList = json.load(jsonData)
wb = xlwt.Workbook()
ws = wb.add_sheet('Pre-Scouting')

# Create the shell by which the excel sheet is formed 

style_string = 'font: bold on'
style = xlwt.easyxf(style_string)

ws.write(0, 0, 'Team Number', style=style)
ws.write(0, 1, 'Team Name', style=style)
ws.write(0, 2, 'Team Locality', style=style)
ws.write(0, 3, 'Team Region', style=style)
ws.write(0, 4, 'Team Country', style=style)

# Add all teams at the event to the teams excel
for i in range(0, len(teamList)):
	ws.write(i+1, 0, teamList[i]['team_number'])
	ws.write(i+1, 1, teamList[i]['nickname'])
	ws.write(i+1, 2, teamList[i]['locality'])
	ws.write(i+1, 3, teamList[i]['region'])
	ws.write(i+1, 4, teamList[i]['country_name'])
	
wb.save( eventName + '.xls')
jsonData.close()

print 'Finished. Enter anything to quit'
sys.stdin.readline().rstrip()