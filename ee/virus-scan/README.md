<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-06-13 20:19:50
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-06-14 11:26:57
 * @Description: 
-->

 ## virus-scan

Scan uploaded files to determine whether there are security risks

## how to use

1. `.evn.local` configures environment variables `VIRUS_SCAN_HOST` and `VIRUS_SCAN_PORT` (optional, default 3310)

2. The system enables this software package

The environment variable configures the virus scanning command. If `VIRUS_SCAN_HOST` is not configured, it is considered that no scanning is required.