#!/bin/bash 
# # content=$(cat scp.sh)  
# # echo "$content"
# lines = $(wc -l scp.sh)
# # lines = "133"
# # echo $lines
# # wc -l scp.sh > count.txt

# wc file.txt > xxx
# read lines words characters filename < xxx 
# echo "$lines"
# echo "$words"
# echo "$characters"
# echo "$filename"
# echo "lines=$lines words=$words characters=$characters filename=$filename" >> count.txt

# wc命令
# wc file.txt

# # for循环
# for i in $(seq 1 5); do
#     echo $i
# done
# for i in 1 2 3; do
#     echo $i
# done

for file in *; do  
    if [ -f "$file" ]; then  
        echo "$file is a file."  
    fi  
done