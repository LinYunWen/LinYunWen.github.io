---
title: motd
date: 2021-08-12 20:59:48
tags: note, linux, motd
---

# MOTD (Message of the day)
- static `/etc/motd`
- Then, Ubuntu Intrepid Ibex (2008) introduced a package _update-motd_, which consisted of
    -   a script called _update-motd._
    -   an entry in _/etc/cron.d_ calling _update-motd_ every 10 minutes.
    -   a folder _/etc/update-motd.d_
<!--more-->
- The script runs all the scripts in _/etc/update-motd.d_ using [_run-parts_](http://manpages.ubuntu.com/manpages/trusty/man8/run-parts.8.html), then stores all output in _/var/run/motd_.
> - For this reason, even in Debian if we create the folder _/etc/update-motd.d_, which does not exist by default, it will be run _at every login_ in the same way as if we had Ubuntu’s _update-motd_ package installed.

## files
-   `/etc/motd` – The classic, static file. Does not exist anymore in Ubuntu 16.04 LTS, not even as a symbolic link to `/var/run/motd`. If it is created, however its contents will be printed too.
-   `/var/run/motd` – This was used by Ubuntu’s first implementation. It is not used anymore. It is just ignored by PAM.
-   `/var/run/motd.dynamic` – **This is what is shown on login currently**. It is updated by `/etc/init.d/motd` at every boot. It is also updated by PAM by running the scripts in `/etc/update-motd.d/`, if they exist.
-   `/etc/motd.tail` – The Ubuntu package `used to` populate `/etc/update-motd.d.` One of them would cat the contents of this file so it was easy to add static content. That script does not exist in the package anymore, so the file does not have the intended effect.

## how to do
```clike
mkdir /etc/update-motd.d
rm -f /etc/motd
```
```clike
// in /etc/pam.d/sshd
session    optional     pam_motd.so motd=/run/motd
session    optional     pam_motd.so noupdate
```



## landscape-sysinfo
> - /usr/lib/python3/dist-packages/landscape

- Display a summary of the current system status

```
       --version
              show program's version number and exit

       -h, --help
              show this help message and exit

       -c FILE, --config=FILE
              Use config from this file (any command line  options  override  settings  from  the
              file) (default: '/etc/landscape/client.conf').

       -d PATH, --data-path=PATH
              The directory to store data files in (default: '/var/lib/landscape/client/').

       --sysinfo-plugins=PLUGIN_LIST
              Comma-delimited list of sysinfo plugins to use.  Default is to use all plugins.

       --exclude-sysinfo-plugins=PLUGIN_LIST
              Comma-delimited  list  of  sysinfo plugins to NOT use.  This always take precedence
              over plugins to include.

       Available  plugins:   Load,   Disk,   Memory,   Temperature,   Processes,   LoggedInUsers,
       LandscapeLink, Network

       Default plugins: Load, Disk, Memory, Temperature, Processes, LoggedInUsers, Network
```
## run-parts
- 照字母排序執行該資料夾下所有可執行文件

## reference
- [Temperature in Ubuntu MOTD](https://blog.kavinyao.com/posts/ubuntu-motd-temp/)
- [bash - Colorize landscape-sysinfo - Ask Ubuntu](https://askubuntu.com/questions/638568/colorize-landscape-sysinfo)
- [Customize your MOTD login message in Debian and Ubuntu – Own your bits](https://ownyourbits.com/2017/04/05/customize-your-motd-login-message-in-debian-and-ubuntu/)
- [ubuntu - How can I edit the welcome message when ssh start? - Server Fault](https://serverfault.com/questions/407033/how-can-i-edit-the-welcome-message-when-ssh-start)
- [How to set a dynamic Message of the Day (motd) in Debian Jessie 8.2 for ssh? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/246436/how-to-set-a-dynamic-message-of-the-day-motd-in-debian-jessie-8-2-for-ssh)
- [Ubuntu Manpage: landscape-sysinfo - Display a summary of the current system status](http://manpages.ubuntu.com/manpages/bionic/man1/landscape-sysinfo.1.html)
- [Ubuntu Manpage: update-motd - dynamic MOTD generation](http://manpages.ubuntu.com/manpages/trusty/man5/update-motd.5.html)
- [Ubuntu Manpage: pam_motd - Display the motd file](http://manpages.ubuntu.com/manpages/trusty/man8/pam_motd.8.html)
