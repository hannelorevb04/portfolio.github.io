<?php header('Content-Type: text/plain');
echo "CWD: " . getcwd() . PHP_EOL;
print_r(scandir(__DIR__));
