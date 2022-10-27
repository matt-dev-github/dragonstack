#!/bin/bash

export PGPASSWORD='node_password'

echo "Configuring dragonstackdb"

dropdb -U -node_user dragonstackdb
createdb -U -node_user dragonstackdb

sqlcmd psql -U node_user dragonstackdb < ./bin/sql/account.sql
sqlcmd psql -U node_user dragonstackdb < ./bin/sql/generation.sql
sqlcmd psql -U node_user dragonstackdb < ./bin/sql/dragon.sql
sqlcmd psql -U node_user dragonstackdb < ./bin/sql/trait.sql
sqlcmd psql -U node_user dragonstackdb < ./bin/sql/dragonTrait.sql

node ./bin/insertTraits.js

echo "dragonstackdb Configured"