 ## Function Description
- Used to create indexes on fields


Configure cron.build_index in steedos-config.yml to enable the maintenance field index service. The value is Cron-style Scheduling. For example
```
cron:
  build_index: "45 * * * * *"
```