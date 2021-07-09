---
title: Bash Script
date: 2021-07-09 20:17:20
tags: note
---

# Bash Script

## Condition
- if
    ```bash
    if [ expression ];
    # ^ ^          ^      please note these spaces
    then
        statement(s)
    fi
    
    if [ expression ] && [ expression_2 ]
    if [ expression ] || [ expression_2 ]
    # following if syntax is allowed. Please observe that the condition has double square brackets
    if [[ expression_1 && expression_2 || expression_3 ]];
    ```
    > - -gt (greater than)
    > - -lt (less than)
    > - -eq (equal to)
    > - -ne (not equal to)
    <!--more-->
    – [ -a FILE ] (Depreciated method to check in bash if file exists.)
    – [ -e FILE ] (Preferred method to check in bash if file exists.)
    – -z (to check if string has zero length)
    – -s (to check if file size is greater than zero)
    – -n (to check if string length is not zero)
    – -f (to check if file exists and is a regular file)
    - -x (to check if file is executable)
    ```bash
    #!/bin/bash

    # Scenario - File exists
    if [ -e /home/tutorialkart/sample.txt ];
    then
        echo "sample.txt - File exists."
    else
        echo "sample.txt - File does not exist."
    fi
    
    if [ -z "hello" ]
    if [ -s /home/tutorialkart/sample.txt ]
    ```
    

## Reference
- [Bash Tutorial](https://www.tutorialkart.com/bash-shell-scripting/bash-tutorial/)