#!/bin/bash

# FILES = $(ls **/*.md)
find . -type f -name '*-*' | while read FILE ; do
    newfile="$(echo ${FILE} |sed -e 's/\-/\_/')" ;
    mv "${FILE}" "${newfile}" ;
done