---
title: snmp-get-resource
date: 2021-12-25 22:57:53
tags: [note, snmp, MIB]
---

# snmp get resource

## snmpwalk
```
snmpwalk -v1 -c public hostname HOST-RESOURCES-MIB::hrStorageIndex
snmpget -v1 -c public hostname HOST-RESOURCES-MIB::hrStorageSize.1
snmpwalk -v1 -c public hostname HOST-RESOURCES-MIB::hrStorageUsed
snmpget -v1 -c public hostname HOST-RESOURCES-MIB::hrStorageUsed.1
```
- Subtract this figure from the total disk space to find the available disk space:
    - 2561695 – 2121747 = 439948
### reference
- [To Check the Disk Space on a Local or Remote Machine](https://docs.oracle.com/cd/E19253-01/817-3000/working-proc-24/index.html)

## snmpget

## snmpgetnext

