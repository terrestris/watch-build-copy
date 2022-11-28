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

Example:

Injects a modified version of [shogun-util](https://github.com/terrestris/shogun-util) into another project [shogun-gis-client](https://github.com/terrestris/shogun-gis-client).

```sh
watch-build-copy './src' 'npm run build' './dist/' '../shogun-gis-client/node_modules/@terrestris/shogun-util/dist/'
