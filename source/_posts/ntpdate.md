---
title: ntpdate
date: 2021-10-21 21:16:01
tags: [note, ntp, ntpdate, linux]
---

# ntpdate
> - NTP 服務（`ntpd`）本身就有自動校時的功能，若啟用 NTP 服務後，就不可以使用 `ntpdate` 的方式校時，兩者僅能擇一使用。

- 以手動更新系統時間
- `ntpdate time.stdtime.gov.tw`
:::info
- 台灣常見 NTP 伺服器
    -   `tock.stdtime.gov.tw`
    -   `watch.stdtime.gov.tw`
    -   `time.stdtime.gov.tw`
    -   `clock.stdtime.gov.tw`
    -   `tick.stdtime.gov.tw`
:::
<!--more-->
## introduction
- `ntpdate [ -46bBdqsuv ] [ -a key ] [ -e authdelay] [ -k keyfile ] [ -o version ] [ -p samples ] [ -t timeout ] [ -U user_name] server [ ... ]`

### Options
* -4
    * Force DNS resolution of following host names on the command line to the IPv4 namespace.
* -6
    * Force DNS resolution of following host names on the command line to the IPv6 namespace.
* -a key
    * Enable the authentication function and specify the key identifier to be used for authentication as the argument key[char46] The keys and key identifiers must match in both the client and server key files. The default is to disable the authentication function.
* -B
    * Force the time to always be slewed using the adjtime() system call, even if the measured offset is greater than +-500 ms. The default is to step the time using settimeofday() if the offset is greater than +-500 ms. Note that, if the offset is much greater than +-500 ms in this case, that it can take a long time (hours) to slew the clock to the correct value. During this time. the host should not be used to synchronize clients.
* -b
    * Force the time to be stepped using the settimeofday() system call, rather than slewed (default) using the adjtime() system call. This option should be used when called from a startup file at boot time.
* -d
    * Enable the debugging mode, in which ntpdate will go through all the steps, but not adjust the local clock. Information useful for general debugging will also be printed.
* -e authdelay
    * Specify the processing delay to perform an authentication function as the value authdelay, in seconds and fraction (see ntpd for details). This number is usually small enough to be negligible for most purposes, though specifying a value may improve timekeeping on very slow CPU's.
* -k keyfile
    * Specify the path for the authentication key file as the string keyfile[char46] The default is /etc/ntp/keys[char46] This file should be in the format described in ntpd[char46]
* -o version
    * Specify the NTP version for outgoing packets as the integer version, which can be 1 or 2. The default is 4. This allows ntpdate to be used with older NTP versions.
* -p samples
    * Specify the number of samples to be acquired from each server as the integer samples, with values from 1 to 8 inclusive. The default is 4.
* -q
    * Query only - don't set the clock.
* -s
    * Divert logging output from the standard output (default) to the system syslog facility. This is designed primarily for convenience of cron scripts.
* -t timeout
    * Specify the maximum time waiting for a server response as the value timeout, in seconds and fraction. The value is is rounded to a multiple of 0.2 seconds. The default is 1 second, a value suitable for polling across a LAN.
* -u
    * Direct ntpdate to use an unprivileged port for outgoing packets. This is most useful when behind a firewall that blocks incoming traffic to privileged ports, and you want to synchronize with hosts beyond the firewall. Note that the -d option always uses unprivileged ports.
* -v
    * Be verbose. This option will cause ntpdate's version identification string to be logged.
* -U user_name
    * ntpdate process drops root privileges and changes user ID to user_name and group ID to the primary group of server_user[char46]

## reference
- [ntpdate(8): set date/time via NTP - Linux man page](https://linux.die.net/man/8/ntpdate)
- [Linux Manpages Online - man.cx manual pages](https://man.cx/ntpdate(1))
- [Linux 設定 NTP 同步系統時間，自動網路校時教學 - G. T. Wang](https://blog.gtwang.org/linux/linux-ntp-installation-and-configuration-tutorial/)