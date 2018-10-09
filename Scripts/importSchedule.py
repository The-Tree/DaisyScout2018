#!/usr/bin/env

import sys
from sys import stdin
import sqlite3
import json
from pprint import pprint

print( 'Enter event code: ')
eventCode = sys.stdin.readline().rstrip().upper()

print( 'Enter event id: ')
eventID = sys.stdin.readline().rstrip().upper()


jsonData = open('../Data/' + eventCode + eventID + '.json')
eventSchedule = json.load(jsonData)
conn = sqlite3.connect('../DB/daisyscout.db')
c = conn.cursor()
        
c.execute('SELECT event_id from EVENTS WHERE event_code = :event_code', {'event_code': eventCode})
eventID = c.fetchone()[0]

for i in range(0, len(eventSchedule)):
        
    # Update the EventSchedule table
    c.execute('SELECT EXISTS(SELECT * FROM EVENTSCHEDULE WHERE event_id = :eventID AND match_num = :match_number)', {'event_id': eventID, 'match_num': eventSchedule[i]['match_number']})
    found = c.fetchone()[0]
    if found == 0:
        c.execute('INSERT INTO EVENTSCHEDULE (event_id, match_num, red_alliance1, red_alliance2, red_alliance3, red_score, blue_score,' +
                                              ' blue_alliance1, blue_alliance2, blue_alliance3) VALUES (:event_id, :match_num, :red_alliance1, ' +
                                              ':red_alliance2, :red_alliance3, :red_score, :blue_score, :blue_alliance1, :blue_alliance2, :blue_alliance3)', 
        {
            'event_id': eventID,
            'match_num': eventSchedule[i]['match_number'],
            'red_alliance1': eventSchedule[i]['alliances']['red']['team_keys'][0],
            'red_alliance2': eventSchedule[i]['alliances']['red']['team_keys'][1],
            'red_alliance3': eventSchedule[i]['alliances']['red']['team_keys'][2],
            'red_score': eventSchedule[i]['alliances']['red']['score'],
            'blue_score': eventSchedule[i]['alliances']['blue']['score'],
            'blue_alliance1': eventSchedule[i]['alliances']['blue']['team_keys'][0],
            'blue_alliance2': eventSchedule[i]['alliances']['blue']['team_keys'][1],
            'blue_alliance3': eventSchedule[i]['alliances']['blue']['team_keys'][2],
        })

conn.commit()
conn.close()
jsonData.close()
