# TweetBucks
TweetBucks to satisfy my urgent need to
exchange money with any of my numerous Twitter followers. 

#Setup
----

```
  npm install
```

```
   cd  /client
```

```
  bower install
```

```
cd ...
```

Run migration script
Note: default database name `tweetbucks`

```
    node server/bin/automigrate.js
```


#Run 
---

Run application 

```
    node .
```


#How to Send Money
----

1. Create payment link on the app
    1.1 Home -> Payments
    1.2 Add New Fund Transfer / Payment Link
    
2. Tweet it with in the app  or copy-paste it to your tweet


#Future Support 
---

 1. Send money by tweeting (via app's twitter account)

    ```
        @tbucks_pay send $<amount> to <receiver_twitter_handle> [optional] #tweetbucks
    ```

   Example

    ```
    @tbucks_pay send $20 to @twitter_handle #tweetbucks
    ```