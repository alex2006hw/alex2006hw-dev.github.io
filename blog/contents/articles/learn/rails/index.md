---
title: Rails
author: alex2006hw
date: 2014-10-17
template: article.jade
comments: true
---

### Rails
  * Opinionated - structured layout of development
    - backend - ruby,

```
   rails new depot
```

  * Rails way of creating an APP
    - Page flow
    - Data flow

```
   cd depot
   rails generate scaffold Product \
            title:string description:text image_url:string price:decimal
```
    - create products data
    - migrate db

```
   rake db:migrate
   rails server
```

> app/ config/ db/ Gemfile.lock log/ Rakefile test/ vendor/ bin/ config.ru
> Gemfile lib/ public/ README.rdoc tmp/

![Ruby On Rails](/images/ruby-on-rails.png)
