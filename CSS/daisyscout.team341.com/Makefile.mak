.PHONY: setup

setup: DB/daisyscout.db

DB:
	mkdir $@

DB/daisyscout.db: DB
	sqlite3 -init SQL/initializeDatabase.sql $@ ""
