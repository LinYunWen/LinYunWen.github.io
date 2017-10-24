<?php
    echo file_get_contents("record.txt");
    $myfile = fopen("record.txt", "w") or die("Unable to open file!");
    /*
    } catch (Exception $e) {
        echo $e
        return 0;
    }
    */

    ///*
    $mode = $_REQUEST["mode"];
    if ($mode == "read") {
        echo fread($myfile,filesize("record.txt"));
    } else if ($mode == "write") {
        $txt = $_REQUEST["name"].": ".$_REQUEST["score"]." 分<br>";
        fwirte($myfile, $txt);
    }
    fclose($myfile);
    //*/
?>
