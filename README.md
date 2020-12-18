Usage
-----

```
watch-build-copy --help
```

```
watch-build-copy <watch> <build> <dist> <target>

watch build copy

Positionals:
  watch   directory to watch                                            [string]
  build   command to build                                              [string]
  dist    dist directory                                                [string]
  target  target directory                                              [string]

Options:
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
  -t, --timeout  the throttle timeout in ms for the build command[default: 1000]
```