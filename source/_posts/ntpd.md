---
title: ntpd
date: 2021-10-24 08:54:49
tags: [note, ntp, ntpd, linux]
---

# ntpd
## introduction
```clike
systemctl start ntpd
systemctl status ntpd
```
- 編輯 `/etc/ntp.conf`
    - e.g.
    ```clike
    # 自己指定 NTP 伺服器
    server tock.stdtime.gov.tw
    server watch.stdtime.gov.tw
    server time.stdtime.gov.tw
    server clock.stdtime.gov.tw
    server tick.stdtime.gov.tw
    ```
<!--more-->
- `ntpd [ -46aAbdDgLmnNqx ] [ -c conffile ] [ -f driftfile ] [ -i jaildir ] [ -I iface ] [ -k keyfile] [ -l logfile ] [ -p pidfile ] [ -P priority ] [ -r broadcastdelay ] [ -s statsdir] [ -t key ] [ -u user[:group] ] [ -U interface_update_interval ] [ -v variable] [ -V variable ]`
- Poll Interval Control
This version of NTP includes an intricate state machine to reduce the network load while maintaining a quality of synchronization consistent with the observed jitter and wander. There are a number of ways to tailor the operation in order enhance accuracy by reducing the interval or to reduce network overhead by increasing it. However, the user is advised to carefully consider the consequences of changing the poll adjustment range from the default minimum of 64 s to the default maximum of 1,024 s. The default minimum can be changed with the tinker minpoll command to a value not less than 16 s. This value is used for all configured associations, unless overridden by the minpoll option on the configuration command. Note that most device drivers will not operate properly if the poll interval is less than 64 s and that the broadcast server and manycast client associations will also use the default, unless overridden.

In some cases involving dial up or toll services, it may be useful to increase the minimum interval to a few tens of minutes and maximum interval to a day or so. Under normal operation conditions, once the clock discipline loop has stabilized the interval will be increased in steps from the minimum to the maximum. However, this assumes the intrinsic clock frequency error is small enough for the discipline loop correct it. The capture range of the loop is 500 PPM at an interval of 64s decreasing by a factor of two for each doubling of interval. At a minimum of 1,024 s, for example, the capture range is only 31 PPM. If the intrinsic error is greater than this, the drift file ntp.drift will have to be specially tailored to reduce the residual error below this limit. Once this is done, the drift file is automatically updated once per hour and is available to initialize the frequency on subsequent daemon restarts.
## options
* -4
    * Force DNS resolution of host names to the IPv4 namespace.
* -6
    * Force DNS resolution of host names to the IPv6 namespace.
* -a
    * Require cryptographic authentication for broadcast client, multicast client and symmetric passive associations. This is the default.
* -A
    * Do not require cryptographic authentication for broadcast client, multicast client and symmetric passive associations. This is almost never a good idea.
* -b
    * Enable the client to synchronize to broadcast servers.
* -c conffile
    * Specify the name and path of the configuration file, default /etc/ntp.conf[char46]
* -d
    * Specify debugging mode. This option may occur more than once, with each occurrence indicating greater detail of display.
* -D level
    * Specify debugging level directly.
* -f driftfile
    * Specify the name and path of the frequency file. This is the same operation as the driftfile driftfile configuration command.
* -g
    * Normally, ntpd exits with a message to the system log if the offset exceeds the panic threshold, which is 1000 s by default. This option allows the time to be set to any value without restriction; however, this can happen only once. If the threshold is exceeded after that, ntpd will exit with a message to the system log. This option can be used with the -q and -x options. See the tinker command for other options.
* -i jaildir
    * Chroot the server to the directory jaildir[char46] This option also implies that the server attempts to drop root privileges at startup (otherwise, chroot gives very little additional security), and it is only available if the OS supports to run the server without full root privileges. You may need to also specify a -u option.
* -I iface
    * Listen on interface. This option may appear an unlimited number of times.
* -k keyfile
    * Specify the name and path of the symmetric key file. This is the same operation as the keys keyfile configuration command.
* -l logfile
    * Specify the name and path of the log file. The default is the system log file. This is the same operation as the logfile logfile configuration command.
* -L
    * Do not listen to virtual IPs. The default is to listen.
* -m
    * Lock memory.
* -n
    * Don't fork.
* -N
    * To the extent permitted by the operating system, run the ntpd at the highest priority.
* -p pidfile
    * Specify the name and path of the file used to record the ntpd process ID. This is the same operation as the pidfile pidfile configuration command.
* -P priority
    * To the extent permitted by the operating system, run the ntpd at the specified priority.
* -q
    * Exit the ntpd just after the first time the clock is set. This behavior mimics that of the ntpdate program, which is to be retired. The -g and -x options can be used with this option. Note: The kernel time discipline is disabled with this option.
* -r broadcastdelay
    * Specify the default propagation delay from the broadcast/multicast server to this client. This is necessary only if the delay cannot be computed automatically by the protocol.
* -s statsdir
    * Specify the directory path for files created by the statistics facility. This is the same operation as the statsdir statsdir configuration command.
* -t key
    * Add a key number to the trusted key list. This option can occur more than once.
* -u user[:group]
    * Specify a user, and optionally a group, to switch to. This option is only available if the OS supports to run the server without full root privileges. Currently, this option is supported under NetBSD (configure with --enable-clockctl) and Linux (configure with --enable-linuxcaps).
* -U interface update interval
    * Number of seconds to wait between interface list scans to pick up new and delete network interface. Set to 0 to disable dynamic interface list updating. The default is to scan every 5 minutes.
* -v variable
* -V variable
    * Add a system variable listed by default.
* -x
    * Normally, the time is slewed if the offset is less than the step threshold, which is 128 ms by default, and stepped if above the threshold. This option sets the threshold to 600 s, which is well within the accuracy window to set the clock manually. Note: Since the slew rate of typical Unix kernels is limited to 0.5 ms/s, each second of adjustment requires an amortization interval of 2000 s. Thus, an adjustment as much as 600 s will take almost 14 days to complete. This option can be used with the -g and -q options. See the tinker command for other options. Note: The kernel time discipline is disabled with this option.
## ntp.conf
- The various modes are determined by the command keyword and the required IP address. Addresses are classed by type as (s) a remote server or peer (IPv4 class A, B and C), (b) the broadcast address of a local interface, (m) a multicast address (IPv4 class D), or (r) a reference clock address (127.127.x.x). The options that can be used with these commands are listed below.
- server
    - For type s and r addresses (only), this command normally mobilizes a persistent client mode association with the specified remote server or local reference clock. If the preempt flag is specified, a preemptable association is mobilized instead. In client mode the client clock can synchronize to the remote server or local reference clock, but the remote server can never be synchronized to the client clock. This command should NOT be used for type b or m addresses.
- peer
    - For type s addresses (only), this command mobilizes a persistent symmetric-active mode association with the specified remote peer. In this mode the local clock can be synchronized to the remote peer or the remote peer can be synchronized to the local clock. This is useful in a network of servers where, depending on various failure scenarios, either the local or remote peer may be the better source of time. This command should NOT be used for type b, m or r addresses.
## reference
- [Linux 設定 NTP 同步系統時間，自動網路校時教學 - G. T. Wang](https://blog.gtwang.org/linux/linux-ntp-installation-and-configuration-tutorial/)
- [ntp.conf(5): Server Options - Linux man page](https://linux.die.net/man/5/ntp.conf)
- [ntpd(8): Network Time Protocol daemon - Linux man page](https://linux.die.net/man/8/ntpd)