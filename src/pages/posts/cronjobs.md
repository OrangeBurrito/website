---
title: 'Cronjobs (quickly)'
publishedDate: 2022-03-17
coverImage: "/images/cronjob.png"
description: "cronjobs, speedily"
layout: '../../layouts/PostLayout.astro'
---

Cron is a cmdline utility used for scheduling commands or shell scripts to run periodically at fixed intervals.

Cron uses a configuration file called a crontab (cron table) that specifies shell commands to run.

## Begin

Start by listing out any running cronjobs with `crontab -l`

Create a cronjob by running `crontab -e`.

Select your editor of choice.

<img src="https://i.imgur.com/8JdGBpi.png" alt="vim logo" height="200">

At the top of the crontab file, insert your first cronjob.

### Syntax:
```
$ [cron expression] [command/shell script]
$ minute hour day(month) month day(week) command
```
You can use asterixes for the time fields to select every hour/minute/etc.

## Cron examples:

1. This runs a shell script located at an absolute path every five minutes.
```bash=
*/5 * * * * /home/orangeburrito/Documents/scripts/script.sh 
```

Inside the aforementioned shell script:
```shell=
#!/bin/sh
date "+Date: %D%nTime: %r" >> /home/orangeburrito/Documents/output.txt
```

2. This runs a command that outputs the current date to a file located at an absolute path, once a day at 6 AM.
```bash=
0 6 * * * date "+Date: %D%nTime: %r" >> /home/orangeburrito/Documents/output.txt
```

Save and edit the crontab file.  Wait the alloted number of time specified in the cron expression and then check.

Learn more about cron schedule expressions [here](https://crontab.guru/).

> **Note:** Cron uses absolute paths.
The location of the script file should be determined using `pwd`

> If running folder-specific commands inside your script file, navigate to that folder beforehand.
> e.g. running a compose script:
> ```bash=
> #!/bin/sh
> cd /path/to/folder
> docker-compose up -d
> ```


## logs
By default cron jobs get logged to `/var/log/syslog`

You can see cronjobs there by running `grep CRON /var/log/syslog`

Cronjobs can be forced to log to a specific file like so:
`*\5 * * * * /path/to/script.sh > /path/to/output.txt`

## etc

You can remove all cronjobs with `crontab -r`

To delete a singular cronjob, run `crontab -e` and remove the line containing that cronjob.


You can insert environment variables into the cron config file at the top.

For example:

```bash=
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
SHELL=/bin/sh
*/2 * * * * /home/orangeburrito/Documents/scripts/script.sh > /home/orangeburrito/Documents/cronlog.log
```