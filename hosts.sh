#!/bin/bash

for i in 1 2 3
do
  echo "Updating host entry: 127.0.0.1 mongo$i"

  # find existing instances in the host file and save the line numbers
  matches_in_hosts="$(grep -n mongo$i /etc/hosts | cut -f1 -d:)"
  host_entry="127.0.0.1 mongo$i"
  
  if [ ! -z "$matches_in_hosts" ]
    then
        # iterate over the line numbers on which matches were found
        while read -r line_number; do
            # replace the text of each line with the desired host entry
            sudo sed -i '' "${line_number}s/.*/${host_entry} /" /etc/hosts
        done <<< "$matches_in_hosts"
    else
        echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
    fi
done
