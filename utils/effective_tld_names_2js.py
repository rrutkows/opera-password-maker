#!/usr/bin/python
import re
import sys

noCommentNonEmptyPattern = re.compile(r"^[^/][^/]")
currentTop = ""
sys.stdout.write ("var effectiveTLDNames = {//")
with open("effective_tld_names.dat") as f:
    for line in f:
        line = line.strip()
        if noCommentNonEmptyPattern.match(line):
            labels = line.split(".")
            top = labels[-1]
            if top != currentTop:
                currentTop = top
                sys.stdout.write("],\n  \"{0}\": [//".format(top))
            sys.stdout.write(",\n    \"{0}\"".format(line))
sys.stdout.write("]\n};\n")
