# MONGO Mailer

# Add vrified token send on your real email

# http://locahost:<порт>/images/<имя файла с расширением>

# POST /auth/register + {email,password}

# POST /auth/login + {email,password} -> function add token

# POST /auth/logout + token -> function remove token

# GET /users/current + token -> get user from token

# GET /contacts?page=<№>&limit=<№> -> function pagination

# GET /contacts?sub= <...> -> filtered from subscription

# PATCH /users?sub=<...>&email=<...> + token -> update subscription from user

# POST /form-data + fotm-data KEY:file_example VALUE:<file>
