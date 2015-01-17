---
title: Tidbits
author: alex2006hw
date: 2015-01-15
template: article.jade
comments: true
---

### Resources

#### eBooks
- [JavaScripts](http://jsbooks.revolunet.com/) Books
- [Python](http://pythonbooks.revolunet.com/) Books

#### mysql
- SELECT User, password, host FROM mysql.user;                                      # show list of users
- UPDATE mysql.user SET Password=PASSWORD('[password]') WHERE User='[username]';    # reset password

#### network
- curl -s checkip.dyndns.org|sed -e 's/.*Current IP Address: //' -e 's/<.*$//';     # get external IP address

#### date time
- python -c "from datetime import date; print (-1*(date(2014,01,01)-date(2014,12,31))).days"  # = 364 days from now to then

