#!/bin/bash

if command -v arp-scan >/dev/null 2>&1; then
    sudo arp-scan --localnet
else
    arp -a
fi
