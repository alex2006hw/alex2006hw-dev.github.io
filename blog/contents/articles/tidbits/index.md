---
title: Tidbits
author: alex2006hw
date: 2014-11-05
template: article.jade
comments: true
---

#### mysql
- SELECT User, password, host FROM mysql.user;                                      # show list of users
- UPDATE mysql.user SET Password=PASSWORD('[password]') WHERE User='[username]';    # reset password

#### network
- curl -s checkip.dyndns.org|sed -e 's/.*Current IP Address: //' -e 's/<.*$//';     # get external IP address
