<?php

    $selected = $_REQUEST["selectedImages"];
    // echo $selected;
    // return $selected;
    
    $length = count($selected);

    $correct = 0;
    for ($i=0 ; $i<$length ; $i++) {
        if (($selected[$i] / 30 ) >= 1) {
            $correct++ ;
        }
    }

    echo $correct;
    
?>
