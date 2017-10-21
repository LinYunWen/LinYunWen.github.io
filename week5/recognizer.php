<?php

    $selected = $_REQUEST["selectedTmages"];
    $length = count($selected);

    $correct = 0;
    for ($i=0 ; $i<$length ; $i++) {
        if (($selected[$i] % 2 ) == 0) {
            $correct++ ;
        }
    }

    return $correct;
>