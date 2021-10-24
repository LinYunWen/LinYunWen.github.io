---
title: ntpq
date: 2021-10-24 08:58:15
tags: [note, ntp, ntpq, linux]
---

# ntpq
- standard NTP query program

## introduction
- `ntpq [-46dinp] [-c command] [host] [...]`
- ntpq uses NTP mode 6 packets to communicate with the NTP server, and hence can be used to query any compatible server on the network which permits it.
    - Note that since NTP is a UDP protocol this communication will be somewhat unreliable, especially over large distances in terms of network topology. ntpq makes one attempt to retransmit requests, and will time requests out if the remote host is not heard from within a suitable timeout time.

## options
* -4
    * Force DNS resolution of following host names on the command line to the IPv4 namespace.
* -6
    * Force DNS resolution of following host names on the command line to the IPv6 namespace.
* -c
    * The following argument is interpreted as an interactive format command and is added to the list of commands to be executed on the specified host(s). Multiple -c options may be given.
* -d
    * Turn on debugging mode.
* -i
    * Force ntpq to operate in interactive mode. Prompts will be written to the standard output and commands read from the standard input.
* -n
    * Output all host addresses in dotted-quad numeric format rather than converting to the canonical host names.
* -p
    * Print a list of the peers known to the server as well as a summary of their state. This is equivalent to the peers interactive command.

## internal commands
* ? [command_keyword]
* helpl [command_keyword]
    * A ? by itself will print a list of all the command keywords known to this incarnation of ntpq[char46] A ? followed by a command keyword will print function and usage information about the command. This command is probably a better source of information about ntpq than this manual page.
* addvars variable_name [ = value] [...]
* rmvars variable_name [...]
* clearvars
    * The data carried by NTP mode 6 messages consists of a list of items of the form variable_name = value, where the = value is ignored, and can be omitted, in requests to the server to read variables. ntpq maintains an internal list in which data to be included in control messages can be assembled, and sent using the readlist and writelist commands described below. The addvars command allows variables and their optional values to be added to the list. If more than one variable is to be added, the list should be comma-separated and not contain white space. The rmvars command can be used to remove individual variables from the list, while the clearlist command removes all variables from the list.
* cooked
    * Causes output from query commands to be "cooked", so that variables which are recognized by ntpq will have their values reformatted for human consumption. Variables which ntpq thinks should have a decodable value but didn't are marked with a trailing ?[char46]
* debug more | less | off
    * Turns internal query program debugging on and off.
* delay milliseconds
    * Specify a time interval to be added to timestamps included in requests which require authentication. This is used to enable (unreliable) server reconfiguration over long delay network paths or between machines whose clocks are unsynchronized. Actually the server does not now require timestamps in authenticated requests, so this command may be obsolete.
* host hostname
    * Set the host to which future queries will be sent. Hostname may be either a host name or a numeric address.
* hostnames [yes | no]
    * If yes is specified, host names are printed in information displays. If no is specified, numeric addresses are printed instead. The default is yes, unless modified using the command line -n switch.
* keyid keyid
    * This command specifies the key number to be used to authenticate configuration requests. This must correspond to a key number the server has been configured to use for this purpose.
* ntpversion 1 | 2 | 3 | 4
    * Sets the NTP version number which ntpq claims in packets. Defaults to 2, Note that mode 6 control messages (and modes, for that matter) didn't exist in NTP version 1.
* passwd
    * This command prompts for a password (which will not be echoed) which will be used to authenticate configuration requests. The password must correspond to the key configured for NTP server for this purpose.
* quit
    * Exit ntpq[char46]
* raw
    * Causes all output from query commands is printed as received from the remote server. The only formatting/interpretation done on the data is to transform non-ASCII data into a printable (but barely understandable) form.
* timeout millseconds
    * Specify a timeout period for responses to server queries. The default is about 5000 milliseconds. Note that since ntpq retries each query once after a timeout, the total waiting time for a timeout will be twice the timeout value set.

## Control Message Commands
> - Each association known to an NTP server has a 16 bit integer association identifier.
> - NTP control messages which carry peer variables must identify the peer the values correspond to by including its association ID.
> - An association ID of 0 is special, and indicates the variables are system variables, whose names are drawn from a separate name space.
- associations
    * Obtains and prints a list of association identifiers and peer statuses for in-spec peers of the server being queried. The list is printed in columns. The first of these is an index numbering the associations from 1 for internal use, the second the actual association identifier returned by the server and the third the status word for the peer. This is followed by a number of columns containing data decoded from the status word. See the peers command for a decode of the condition field. Note that the data returned by the associations command is cached internally in ntpq[char46] The index is then of use when dealing with stupid servers which use association identifiers which are hard for humans to type, in that for any subsequent commands which require an association identifier as an argument, the form &index may be used as an alternative.

| Variable       | Description     |
| --- | --- |
| **conf**       | **yes**: persistent, **no**: ephemeral                              |
| **reach**      | **yes**: reachable, **no**: unreachable                             |
| **auth**       | **ok**, **yes**, **bad** and **none**                               |
| **condition**  | selection status (see the **select** field of the peer status word) |
| **last_event** | event report (see the **event** field of the peer status word)      |
| **cnt**        | event count (see the **count** field of the peer status word)       |


* clockvar [assocID] [variable_name [ = value[...]] [...]
* cv [assocID] [variable_name [ = value [...] ][...]
    * Requests that a list of the server's clock variables be sent. Servers which have a radio clock or other external synchronization will respond positively to this. If the association identifier is omitted or zero the request is for the variables of the system clock and will generally get a positive response from all servers with a clock. If the server treats clocks as pseudo-peers, and hence can possibly have more than one clock connected at once, referencing the appropriate peer association ID will show the variables of a particular clock. Omitting the variable list will cause the server to return a default variable display.
* lassociations
    * Obtains and prints a list of association identifiers and peer statuses for all associations for which the server is maintaining state. This command differs from the associations command only for servers which retain state for out-of-spec client associations (i.e., fuzzballs). Such associations are normally omitted from the display when the associations command is used, but are included in the output of lassociations[char46]
* lpassociations
    * Print data for all associations, including out-of-spec client associations, from the internally cached list of associations. This command differs from passociations only when dealing with fuzzballs.
* lpeers
    * Like R peers, except a summary of all associations for which the server is maintaining state is printed. This can produce a much longer list of peers from fuzzball servers.
* mreadlist assocID assocID
* mrl assocID assocID
    * Like the readlist command, except the query is done for each of a range of (nonzero) association IDs. This range is determined from the association list cached by the most recent associations command.
* mreadvar assocID assocID [ variable_name [ = value[ ... ]
* mrv assocID assocID [ variable_name [ = value[ ... ]
    * Like the readvar command, except the query is done for each of a range of (nonzero) association IDs. This range is determined from the association list cached by the most recent associations command.
* opeers
    * An old form of the peers command with the reference ID replaced by the local interface address.
* passociations
    * Displays association data concerning in-spec peers from the internally cached list of associations. This command performs identically to the associations except that it displays the internally stored data rather than making a new query.
* peers
    * Obtains a current list peers of the server, along with a summary of each peer's state. Summary information includes the address of the remote peer, the reference ID (0.0.0.0 if this is unknown), the stratum of the remote peer, the type of the peer (local, unicast, multicast or broadcast), when the last packet was received, the polling interval, in seconds, the reachability register, in octal, and the current estimated delay, offset and dispersion of the peer, all in milliseconds. The character at the left margin of each line shows the synchronization status of the association and is a valuable diagnostic tool. The encoding and meaning of this character, called the tally code, is given later in this page.


| Variable      | Description |
| --- | --- |
| **\[tally\]** | single-character code indicating current value of the **select** field of the peer status word |
| **remote** | host name (or IP number) of peer |
| **refid** | association ID or kiss code |
| **st** | stratum |
| **t** | Type of peer (local, unicast, multicast, or broadcast) **u**: unicast, **b**: broadcast, **l**: local |
| **when** | sec/min/hr since last received packet |
| **poll** | poll interval (log2 s) |
| **reach** | reach shift register (octal) |
| **delay** | roundtrip delay |
| **offset** | offset |
| **jitter** | jitter |

- tally code
    * space
        * Discarded due to high stratum and/or failed sanity checks.
    * \x
        * Designated falseticker by the intersection algorithm.
    * \.
        * Culled from the end of the candidate list.
    * \-
        * Discarded by the clustering algorithm.
    * \+
        * Included in the final selection set.
    * \#
        * Selected for synchronization but distance exceeds maximum.
    * \*
        * Selected for synchronization.
    * o
        * Selected for synchronization, pps signal in use.
* pstatus assocID
    * Sends a read status request to the server for the given association. The names and values of the peer variables returned will be printed. Note that the status word from the header is displayed preceding the variables, both in hexadecimal and in pidgeon English.
* readlist [ assocID]
* rl [ assocID ]
    * Requests that the values of the variables in the internal variable list be returned by the server. If the association ID is omitted or is 0 the variables are assumed to be system variables. Otherwise they are treated as peer variables. If the internal variable list is empty a request is sent without data, which should induce the remote server to return a default display.
* readvar assocID variable_name [ = value ] [ ...]
* rv assocID [ variable_name [ = value ] [...]
    * Requests that the values of the specified variables be returned by the server by sending a read variables request. If the association ID is omitted or is given as zero the variables are system variables, otherwise they are peer variables and the values returned will be those of the corresponding peer. Omitting the variable list will send a request with no data which should induce the server to return a default display. The encoding and meaning of the variables derived from NTPv3 is given in RFC-1305; the encoding and meaning of the additional NTPv4 variables are given later in this page.
* writevar assocID variable_name[ = value [ ...]
    * Like the readvar request, except the specified variables are written instead of read.
* writelist [ assocID ]
    * Like the readlist request, except the internal list variables are written instead of read.

## reference
- [ntpq Command - IBM Documentation](https://www.ibm.com/docs/en/aix/7.2?topic=n-ntpq-command)
- [ntpq: standard NTP query program - Linux Man Pages (8)](https://www.systutorials.com/docs/linux/man/8-ntpq/)
- [詳細解讀Linux系統中ntpq命令的使用_Linux命令](http://www.unixlinux.online/unixlinux/gdliunx/linuxml/201702/21882.html)
- [網絡時間的那些事及 ntpq 詳解 - 每日頭條](https://kknews.cc/zh-tw/tech/ynyqggn.html)
- [ntpq(8): standard NTP query program - Linux man page](https://linux.die.net/man/8/ntpq)
- [How to verify NTP is working Or not (Check Status of NTP) - nixCraft](https://www.cyberciti.biz/faq/linux-unix-bsd-is-ntp-client-working/)
- [Event Messages and Status Words](https://docs.ntpsec.org/latest/decode.html#peer)