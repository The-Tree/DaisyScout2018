.PHONY: setup

setup: DB/daisyscout.db

DB:
	mkdir $@

DB/daisyscout.db: DB
	sqlite3 -init SQL/initializeDatabase.sql $@ ""

reset:
	rm DB/daisyscout.db
	sqlite3 -init SQL/initializeDatabase.sql DB/daisyscout.db ""