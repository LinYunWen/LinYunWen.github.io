---
title: Mac Check SSD
date: 2021-09-12 19:47:29
tags: [note, mac, book section, ssd]
---

# Mac Check SSD

- install
    - `brew install smartmontools`
- check id
    - `diskutil list`
        - 
    - 磁碟工具程式
        - ![](https://i.imgur.com/pjbm8dX.png)
<!--more-->
- check ssd
    - `smartctl -a ${ssd_id}`
    - `smartctl -s on -a ${ssd_id}`
        - ![](https://i.imgur.com/oEO5Eh7.png)
        - `175 Host_Writes_MiB` is the key.
        - Wear_Leveling_Count
    - descriptions
        - Every of the SMART attributes has several columns as shown by “smartctl -a \<device>”:
        -   **ID:** The ID number of the attribute, good for comparing with other lists like [Wikipedia: S.M.A.R.T.: Known ATA S.M.A.R.T. attributes](http://en.wikipedia.org/wiki/S.M.A.R.T.#Known_ATA_S.M.A.R.T._attributes) because the attribute names sometimes differ.
        -   **Name:** The name of the SMART attribute.
        -   **Value:** The current, normalized value of the attribute. Higher values are always better (except for temperature for hard disks of some manufacturers). The range is normally 0-100, for some attributes 0-255 (so that 100 resp. 255 is best, 0 is worst). There is no standard on how manufacturers convert their raw value to this normalized one: when the normalized value approaches threshold, it can do linearily, exponentially, logarithmically or any other way, meaning that a doubled normalized value does not necessarily mean “twice as good”.
        -   **Worst:** The worst (normalized) value that this attribute had at any point of time where SMART was enabled. There seems to be no mechanism to reset current SMART attribute values, but this still makes sense as some SMART attributes, for some manufacturers, fluctuate over time so that keeping the worst one ever is meaningful.
        -   **Threshold:** The threshold below which the normalized value will be considered “exceeding specifications”. If the attribute type is “Pre-fail”, this means that SMART thinks the hard disk is just before failure. This will “trigger” SMART: setting it from “SMART test passed” to “SMART impending failure” or similar status.
        -   **Type:** The type of the attribute. Either “Pre-fail” for attributes that are said to indicate impending failure, or “Old\_age” for attributes that just indicate wear and tear. Note that one and the same attribute can be classified as “Pre-fail” by one manufacturer or for one model and as “Old\_age” by another or for another model. This is the case for example for attribute Seek\_Error\_Rate (ID 7), which is a widespread phenomenon on many disks and not considered critical by some manufacturers, but Seagate has it as “Pre-fail”.
        -   **Raw value:** The current raw value that was converted to the normalized value above. smartctl shows all as decimal values, but some attribute values of some manufacturers cannot be reasonably interpreted that way (for the details: [Wikipedia: S.M.A.R.T.: Known ATA S.M.A.R.T. attributes](http://en.wikipedia.org/wiki/S.M.A.R.T.#Known_ATA_S.M.A.R.T._attributes)).


## note
- 輸出會有點不同
    - [macos - How do I get detailed SMART disk information on OS X (Mavericks or later) - Ask Different](https://apple.stackexchange.com/questions/135565/how-do-i-get-detailed-smart-disk-information-on-os-x-mavericks-or-later)
- 計算出他的壽命
    - Samsung Magician simply use a SSD's TBW as health indicator, for example, 850 EVO 250GB (designed TBW 75GB) (TBW: total byte write)
        - `2.56TB / 75TB = 3.41% of its designed capacity.`


## reference
- [教你檢查Mac SSD壽命與健康度，用macOS終端機即可查詢 - 瘋先生](https://mrmad.com.tw/how-to-check-mac-ssd-health)
- [macos - How do I get detailed SMART disk information on OS X (Mavericks or later) - Ask Different](https://apple.stackexchange.com/questions/135565/how-do-i-get-detailed-smart-disk-information-on-os-x-mavericks-or-later)
- [as](https://ma.juii.net/blog/interpret-smart-attributes)
- [获取SSD寿命 - Gavin的博客 | Gavin Blog](https://gavin-wang-note.github.io/2020/01/22/get-ssd-life-span/)
- [三星固态硬盘“ Wear_Leveling_Count”的含义](https://qastack.cn/superuser/1037644/samsung-ssd-wear_leveling_count-meaning)
- [S.M.A.R.T. - Wikipedia](https://en.wikipedia.org/wiki/S.M.A.R.T.#Known_ATA_S.M.A.R.T._attributes)