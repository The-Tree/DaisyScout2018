#!/usr/bin/env

import sys
from sys import stdin
import sqlite3
import json
from pprint import pprint

print ('Enter event code: ')
eventCode = sys.stdin.readline().rstrip().upper()
print ('Enter event name: ')
eventName = sys.stdin.readline().rstrip()

jsonData = open('../Data/' + eventCode + '.json')
teamList = json.load(jsonData)
conn = sqlite3.connect('../DB/daisyscout.db')
c = conn.cursor()

# Add the event to the EVENTS table if an event with the same code doesn't already exist
c.execute('SELECT EXISTS(SELECT * FROM EVENTS WHERE event_code = :event_code)', {'event_code': eventCode})
found = c.fetchone()[0]
if found == 0:
    c.execute('INSERT INTO Events (name, event_code) VALUES (:name, :code)',
    {
        'name': eventName,
        'code': eventCode
    })
        
c.execute('SELECT event_id from EVENTS WHERE event_code = :event_code', {'event_code': eventCode})
eventID = c.fetchone()[0]

# Add all teams at the event to the teams table, if they haven't already been previously added
for i in range(0, len(teamList)):
    c.execute('SELECT EXISTS(SELECT * FROM TEAMS WHERE team_num = :team_num)', {'team_num': teamList[i]['team_number']})
    found = c.fetchone()[0]
    if found == 0:
        c.execute('INSERT INTO Teams (team_num, name, locality, region, country) VALUES (:team_num, :name, :locality, :region, :country)', 
        {
            'team_num': teamList[i]['team_number'],
            'name': teamList[i]['nickname'],
            'locality': teamList[i]['locality'],
            'region': teamList[i]['region'],
            'country': teamList[i]['country_name']
        })
    else:
        print (str(teamList[i]['team_number']) + ' already exists in the database.')
        
    # Update the EventTeams table
    c.execute('SELECT EXISTS(SELECT * FROM EVENTTEAMS WHERE event_id = :event_id AND team_num = :team_num)', {'event_id': eventID, 'team_num': teamList[i]['team_number']})
    found = c.fetchone()[0]
    if found == 0:
        c.execute('INSERT INTO EVENTTEAMS (event_id, team_num) VALUES (:event_id, :team_num)', 
        {
            'event_id': eventID,
            'team_num': teamList[i]['team_number'],
        })

conn.commit()
conn.close()
jsonData.close()
