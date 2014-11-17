---
title: Tidbits
author: alex2006hw
date: 2014-11-13
template: article.jade
comments: true
---

#### mysql

- SELECT User, password, host FROM mysql.user;                                      # show list of users
- UPDATE mysql.user SET Password=PASSWORD('[password]') WHERE User='[username]';    # reset password
- CREATE USER 'USER'@'localhost' IDENTIFIED BY 'PASSWD';                            # create a monitor user
- GRANT PROCESS, REPLICATION CLIENT ON *.* TO 'USER'@'localhost';                   # grant monitoring permission to user
- flush privileges;                                                                 # update accounts


#### network

- curl -s checkip.dyndns.org|sed -e 's/.*Current IP Address: //' -e 's/<.*$//';     # get external IP address
